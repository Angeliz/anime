// 爬取第一层网页
async = require("async");
var https=require('https');
var cheerio=require('cheerio');

var tencent="tencent";
var bilibili="bilibili";
var iqiyi="iqiyi";
var youku="youku";
var urlT='https://v.qq.com/x/list/cartoon?iarea=1&offset=0';
var urlI='https://list.iqiyi.com/www/4/37-------------4-1-1-iqiyi--.html';
var urlY='https://list.youku.com/category/show/c_100_a_%E5%A4%A7%E9%99%86_s_1_d_2_p_1.html?spm=a2h1n.8251845.0.0';
var urlB='https://bangumi.bilibili.com/web_api/season/index_cn?page=1&page_size=40&version=0&is_finish=0&start_year=0&tag_id=&index_type=1&index_sort=0';
var page=0;

// 连接数据库
var mysql=require('mysql');
var connection= mysql.createConnection({
    host:'localhost',
    user:'root',
    database:'cartoon'
});
connection.connect(function (err) {
    if(err){
        console.log('数据库连接失败：'+err);
    }else {
        console.log('数据库连接成功');
    }
});
//重构的插入函数
function insert (datalist,table) {
    let addData="";
    if (table===tencent){
        addData = "insert into tencent(`name`,`src`,`nums`,`score`,`play`) values ?";
    }else if(table===iqiyi){
        addData = "insert into iqiyi(`name`,`src`,`nums`) values ?";
    }else if(table===youku){
        addData = "insert into youku(`name`,`src`,`nums`,`actor`,`play`) values ?";
    }else {
        addData = "insert into bilibili(`name`,`src`) values ?";
    }
    connection.query(addData, [datalist], function (err, rows, fields) {
        if(err){
            console.log('INSERT ERROR - ', err.message);
            return;
        }
        // console.log("插入数据成功");
        return 0;
    });
}

function startRequest(url,table) {
    https.get(url,function (res) {
        var html='';
        res.setEncoding('utf-8');
        res.on('data',function (chunk) {
            html+=chunk;
        });
        res.on('end',function () {
            var $ = cheerio.load(html);

            if(table===tencent){
                let list = $('.figures_list').children();
                list.each(function (index,item) {
                    var videoData=[];
                    // console.log(item);'
                    var src=$(item).children().first().attr('href');
                    var name=$('.figure_title',this).children().first().text().split(" ").join("").replace("第1季","第一季").replace("第2季","第二季");
                    // 评分
                    var score=Number($('.score_l',this).text()+$('.score_s',this).text());
                    // 播放量
                    var play=Number($('.figure_count .num',this).text().replace("万","0000").replace("亿","00000000"))/10000;
                    // 集数
                    var nums=$('.figure_info',this).text();
                    video={
                        name:name,
                        src:src,
                        nums:nums,
                        score:score,
                        play:play
                    };
                    videoData.push([video.name,video.src,video.nums,video.score,video.play]);
                    if(videoData!==[]){
                        insert(videoData,tencent);
                        // console.log(videoData);
                    }
                });
                // console.log(videoList);
                var nextLink='https://v.qq.com/x/list/cartoon'+$('.page_next').attr('href');
                console.log(nextLink);
                if(nextLink!=="https://v.qq.com/x/list/cartoonjavascript:;"){
                    startRequest(nextLink,tencent);
                }else{
                    console.log("数据存储完毕");
                    return 0;
                }
            }else if(table===iqiyi){
                let list = $('.site-piclist').children();
                list.each(function (index,item) {
                    let videoData=[];
                    let src=$('.site-piclist_pic_link',this).attr('href');
                    let name=$('.site-piclist_info_title ',this).children().first().text().split(" ").join("").replace("第1季","第一季").replace("第2季","第二季");
                    // 集数
                    let nums=$('.icon-vInfo',this).text().trim();
                    let video={
                        name:name,
                        src:src,
                        nums:nums,
                    };
                    videoData.push([video.name,video.src,video.nums]);
                    if(videoData!==[]){
                        insert(videoData,iqiyi);
                    }
                });
                let nextLink='https://list.iqiyi.com'+$('.mod-page').children().last().attr('href');
                console.log(nextLink);
                if(nextLink!=="https://list.iqiyi.comundefined"){
                    startRequest(nextLink,iqiyi);
                }else{
                    console.log("iqiyi存储数据结束");
                    return 0;
                }
            }else if(table===youku){
                let list = $('.panel').children();
                list.each(function (index,item) {
                    let videoData=[];
                    // console.log(item);'
                    let src="http:"+$('.p-thumb',this).children().first().attr('href');
                    let name=$('.title a',this).text().trim().split(" ").join("").replace("第1季","第一季").replace("第2季","第二季");
                    // 播放量
                    let play=$('.info-list',this).children().last().text().slice(0,-4).replace(",","");
                    if(play.includes("万")){
                        var playNum=Number(play.replace("万",""));
                        play=playNum;
                    }else {
                        play=Number(play)/10000;
                    }
                    // console.log(play);
                    let actor=$('.actor',this).children().first().next().text()+","+$('.actor',this).children().first().next().next().text();
                    if(actor===","){
                        actor="";
                    }
                    // 集数
                    let nums=$('.p-time ',this).children().last().text();
                    if(src!=="http:undefined"){
                        let video={
                            name:name,
                            src:src,
                            nums:nums,
                            actor:actor,
                            play:play
                        };
                        videoData.push([video.name,video.src,video.nums,video.actor,video.play]);
                        if(videoData!==[]){
                            insert(videoData,youku);
                        }
                    }
                });
                let nextLink='https:'+$('.next a').attr('href');
                nextLink=nextLink.replace("大陆","%E5%A4%A7%E9%99%86");
                console.log(nextLink);
                if(nextLink!=="https:undefined"){
                    startRequest(nextLink,youku);
                }else {
                    console.log("youku数据存储完毕");
                    return 0;
                }
            }else if(table===bilibili){
                let videoData=[];
                let json=JSON.parse(html).result.list;
                for(let i=0;i<json.length;i++){
                    videoData.push([
                        json[i].title.split(" ").join("").replace("第1季","第一季").replace("第2季","第二季"),  //name
                        json[i].url  //src
                    ])
                }
                if(videoData!==[]){
                    insert(videoData,bilibili);
                    console.log(videoData);
                }
                page++;
                let nextLink='https://bangumi.bilibili.com/web_api/season/index_cn?page='+page+"&page_size=40&version=0&is_finish=0&start_year=0&tag_id=&index_type=1&index_sort=0";
                console.log(nextLink,bilibili);
                if(page<=10){
                    startRequest(nextLink,bilibili);
                }else {
                    console.log("bilibili数据存储完毕");
                    return 0;
                }
            }
        })
    })
}

// 封装的函数
fetchPage = function(url,table){
    startRequest(url,table);
};
// fetchPage(urlT,tencent);
// fetchPage(urlI,iqiyi);
// fetchPage(urlY,youku);
// fetchPage(urlB,bilibili);
