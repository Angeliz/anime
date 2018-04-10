async = require("async");
var https=require('https');
var cheerio=require('cheerio');


var id=618;
var tencentSrc=[];
var bilibiliSrc=[];
var iqiyiSrc=[];
var youkuSrc=[];
var tencent="tencent";
var bilibili="bilibili";
var iqiyi="iqiyi";
var youku="youku";


var mysql=require('mysql');
// 用createConnection方法创建一个表示与mysql数据库服务器之间连接的connection对象
var connection= mysql.createConnection({
    host:'localhost',
    user:'root',
    database:'anime'
});
connection.connect(function (err) {
    if(err){
        console.log('数据库连接失败：'+err);
    }else {
        console.log('数据库连接成功');
    }
});



selectSrc = function(table,tableSrc) {
    return new Promise(function (resovle, reject) {
        var selectData = "select src from"+" "+table;
        connection.query(selectData,function (err, rows, fields) {
            if(err){
                console.log('SELECT ERROR - ', err.message);
                return;
            }
            for(let i=0;i<rows.length;i++){
                tableSrc.push(rows[i].src);
            }
            console.log("取出数据完成");
            resovle();
        });
    });
};
function update(data,table) {
    // var sql="";
    if(table===tencent){
        var sql="update "+table+" set time=?,label=?,description=? where name=?";
    }else if(table===iqiyi){
        // videoData=[time,label,description,play,score,name]
        var sql="update "+table+" set time=?,label=?,description=?,play=?,score=? where name=?";
        // console.log(sql);
    }else if(table===youku){
        // videoData=[label,description,score,name];
        var sql="update "+table+" set label=?,description=?,score=? where name=?";
    }else if(table===bilibili){
        // var videoData=[time,nums,play,label,actor,description,name]
        var sql="update "+table+" set time=?,nums=?,play=?,label=?,actor=?,description=? where name=?";
    }else {
        console.log("update error");
    }
    connection.query(sql, data, function (err, rows, fields) {
        if(err){
            console.log('UPDATE ERROR - ', err.message);
            return;
        }
        console.log("更新成功");
    });
}

function startRequest(url,table,tableSrc) {
    https.get(url,function (res) {
        var html='';
        res.setEncoding('utf-8');
        res.on('data',function (chunk) {
            html+=chunk;
        });
        res.on('end',function () {
            // console.log("请求完成");
            var $ = cheerio.load(html);
            if(table===tencent){
                tencentSpider(url,table,tableSrc,html,$);
            }else if(table===iqiyi){
                iqiyiSpider(url,table,tableSrc,html,$);
            // }else if(table===youku){
            //     var description=$(".summary").text();
            //     var name=$(".tvinfo h2 a").text().split(" ").join("").replace("第1季","第一季").replace("第2季","第二季");
            //     var score=Number($(".score").text());
            //     var labelList=$("span[data-sn='tags']").children('a');
            //     var label="";
            //     labelList.each(function (index,item) {
            //         if(index===0){
            //             label=$(item).text();
            //         }else {
            //             label=label+","+$(item).text();
            //         }
            //     });
            //     videoData=[label,description,score,name];
            }else{
                bilibiliSpider(url,table,tableSrc,html,$);
            }
        })
    })
}

function tencentSpider(url,table,tableSrc,html,$) {
    var name=$('.player_title a').text().split(" ").join("").replace("第1季","第一季").replace("第2季","第二季");
    var description=$('.summary').text().trim().split("\n").join("");
    var list=$('._video_tags').children('a');
    var time='';
    var label='';
    list.each(function (index,item) {
        if(index===1){
            time=$(item).text();
        }else if(index===2){
            label=$(item).text();
        }
    });
    var videoData=[time,label,description,name];
    // console.log(videoData);
    if(videoData[videoData.length-1]!==""){
        update(videoData,table);
        var nextLink= tableSrc[++id];
        console.log(nextLink);
        if(id<tableSrc.length){
            startRequest(nextLink,table,tableSrc);
        }else{
            console.log("数据存储完毕");
            return 0;
        }
    }else {
        startRequest(url,table,tableSrc)
    }
}

function iqiyiSpider(url,table,tableSrc,html,$) {
    // 正常情况
    var small=html.includes("block-D");
    // console.log(small);
    if(!url.includes("a_")&&!url.includes("v_")){
        var nextLink= tableSrc[++id];
        console.log(nextLink);
        if(id<tableSrc.length){
            startRequest(nextLink,table,tableSrc);
        }else{
            console.log("数据存储完毕");
            return 0;
        }
    } else if(url.includes("a_")&&small){
        // console.log("1");
        var time=$(".sub_title").text();
        var script=$("script[src='//static.iqiyi.com/js/lib/sea1.2.js']").next().html().toString();
        script=script.slice(script.indexOf("albumId:")+8,script.indexOf("tvId")).trim().replace(",","");
        var urlScore="https://score-video.iqiyi.com/beaver-api/get_sns_score?qipu_ids="+script+"&appid=0";
        var score=0;
        var videoData=[];
        //动态获取score
        https.get(urlScore,function (result) {
            var htmlScore="";
            result.setEncoding('utf-8');
            result.on('data',function (chunk1) {
                htmlScore+=chunk1;
            });
            result.on('end',function () {
                score=Number(htmlScore.slice(htmlScore.indexOf("\"sns_score\":")+12,htmlScore.indexOf("}]")));
                var labelList=$("div[itemprop=\"genre\"] em").children("a");
                var label="";
                labelList.each(function (index,item) {
                    if(index===0){
                        label=$(item).text();
                    }else {
                        label=label+","+$(item).text();
                    }
                });
                var play=$("#widget-playcount").text().replace("次","");
                if(play.includes("万")){
                    var playNum=Number(play.replace("万",""));
                    play=playNum;
                }else if(play.includes("亿")){
                    var playNum=Number(play.replace("亿",""));
                    play=playNum*10000;
                }else {
                    play = Number(play) / 10000;
                }
                // console.log(score);
                if(isNaN(score)){
                    score=0;
                }
                var description=$("span[data-moreorless='moreinfo'] span").text().replace("收起","").trim();
                if(description===''){
                    description=$("span[data-moreorless='lessinfo'] span").text().trim();
                }
                var name=$(".main_title a").text().split(" ").join("").replace("第1季","第一季").replace("第2季","第二季");
                videoData=[time,label,description,play,score,name];
                // console.log(videoData);
                if(videoData[videoData.length-1]!==""||videoData[0]!==''){
                    if(videoData[videoData.length-1]!==''){
                        update(videoData,table);
                    }
                    var nextLink= tableSrc[++id];
                    console.log(nextLink);
                    if(id<tableSrc.length){
                        startRequest(nextLink,table,tableSrc);
                    }else{
                        console.log("数据存储完毕");
                        return 0;
                    }
                }else {
                    startRequest(url,table,tableSrc)
                }
            });
        });
    } else{
        if(url.includes("a_")&&!small){
            // console.log("2");
            var name=$("h1[itemprop='name'] a").text().split(" ").join("").replace("第1季","第一季").replace("第2季","第二季");
            var labelList=$("p[itemprop=\"genre\"] a[rseat=\"jj-zjxx-text-0923\"]");
            var description=$(".bigPic-b-jtxt").text();
        }else if(url.includes("v_")){
            // console.log("3");
            var labelList=$("#datainfo-taglist").children();
            var name=$("#widget-videotitle").text().split(" ").join("").replace("第1季","第一季").replace("第2季","第二季");
            var description=$("#datainfo-tag-desc").text().trim().split("\n").join("").replace(" ","");
        }
        var time=$("meta[itemprop='uploadDate']").attr("content").split("-")[0];
        var label="";
        labelList.each(function (index,item) {
            if(index===0){
                label=$(item).text();
            }else {
                label=label+","+$(item).text();
            }
            console.log("000000");
        });
        //js加载 play score
        script=html.slice(html.indexOf("albumId:")+8,html.indexOf("tvId")).trim().replace(",","");
        var urlScore="https://score-video.iqiyi.com/beaver-api/get_sns_score?qipu_ids="+script+"&appid=0";
        var score=0;
        var play=0;
        var videoData=[];
        https.get(urlScore,function (result) {
            var htmlScore="";
            result.setEncoding('utf-8');
            result.on('data',function (chunk1) {
                htmlScore+=chunk1;
            });
            result.on('end',function () {
                score=Number(htmlScore.slice(htmlScore.indexOf("\"sns_score\":")+12,htmlScore.indexOf("}]")));
                https.get("https://cache.video.iqiyi.com/jp/pc/"+script+"/",function (result2) {
                    var htmlPlay="";
                    result2.setEncoding('utf-8');
                    result2.on('data',function (chunk2) {
                        htmlPlay+=chunk2;
                    });
                    result2.on('end',function () {
                        play=Number(htmlPlay.slice(htmlPlay.indexOf(":")+1,htmlPlay.indexOf("}]")))/10000;
                        videoData=[time,label,description,play,score,name];
                        if(videoData[videoData.length-1]!==""){
                            update(videoData,table);
                            var nextLink= tableSrc[++id];
                            console.log(nextLink);
                            if(id<tableSrc.length){
                                startRequest(nextLink,table,tableSrc);
                            }else{
                                console.log("数据存储完毕");
                                return 0;
                            }
                        }else {
                            startRequest(url,table,tableSrc)
                        }
                    });
                });
            });
        });
    }
}

function bilibiliSpider(url,table,tableSrc,html,$) {
    var name=$(".info-title").text().split(" ").join("").replace("第1季","第一季").replace("第2季","第二季");
    var labelList=$(".info-title").nextAll();
    var label="";
    labelList.each(function (index,item) {
        if(index===0){
            label=$("span",item).text();
        }else {
            label=label+","+$("span",item).text();
        }
    });
    var play=$(".info-count-item-play em").text();
    if(play.includes("万")){
        var playNum=Number(play.replace("万",""));
        play=playNum;
    }else if(play.includes("亿")){
        var playNum=Number(play.replace("亿",""));
        play=playNum*10000;
    }else {
        play=Number(play)/10000;
    }
    // var fans=$(".info-count-item-fans em").text();
    // if(fans.includes("万")){
    //     var fansNum=Number(fans.replace("万",""));
    //     fans=fansNum;
    // }else if(fans.includes("亿")){
    //     var fansNum=Number(fans.replace("亿",""));
    //     fans=fansNum*10000;
    // }else {
    //     fans=Number(fans)/10000;
    // }
    if(isNaN(play)){
        play=0;
    }
    var time=$(".info-update em").children().first().text().trim().slice(0,4);
    var actorList=$(".info-cv em").children();
    var actor="";
    actorList.each(function (index,item) {
        if(index===0){
            actor=$(item).text().slice(1);
        }else {
            actor=actor+","+$(item).text().slice(1);
        }
    });
    var description=$(".info-desc").text();
    var nums=$("body").children().last().children().first().html();
    nums=nums.slice(nums.indexOf("newestEp:")+9,nums.indexOf("isStarted")).trim().replace(",","").replace("\'","").replace("\'","");
    var videoData=[time,nums,play,label,actor,description,name];
    // console.log(videoData);
    if(videoData[videoData.length-1]!==""){
        update(videoData,table);
        var nextLink= tableSrc[++id];
        console.log(nextLink);
        if(id<tableSrc.length){
            startRequest(nextLink,table,tableSrc);
        }else{
            console.log("数据存储完毕");
            return 0;
        }
    }else {
        startRequest(url,table,tableSrc)
    }
}

// 封装的函数
fetchPage = function(table,tableSrc) {
    return new Promise(function (resovle, reject) {
        var url=tableSrc[id];
        // iqiyi调试
        // var url="https://www.iqiyi.com/a_19rrh8jj45.html#vfrm=2-4-0-1";
        // var url="https://www.iqiyi.com/v_19rrkq3mxk.html#vfrm=2-4-0-1";
        // var url="https://www.iqiyi.com/a_19rrk2kkw5.html#vfrm=2-4-0-1";
        // var url="https://www.iqiyi.com/a_19rrifrq9l.html#vfrm=2-4-0-1";
        // console.log(url);
        startRequest(url,table,tableSrc);
        resovle();
    });
};

fn = async function () {
    //这里需要同步加载
    // await selectSrc(tencent,tencentSrc);
    // await fetchPage(tencent,tencentSrc);

    await selectSrc(iqiyi,iqiyiSrc);
    await fetchPage(iqiyi,iqiyiSrc);

    // await selectSrc(youku,youkuSrc);
    // await fetchPage(youku,youkuSrc);

    // await selectSrc(bilibili,bilibiliSrc);
    // await fetchPage(bilibili,bilibiliSrc);
}();