var https=require('https');
var cheerio=require('cheerio');

var url='https://v.qq.com/x/list/cartoon?iarea=1&offset=0';
var videoList=[];

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
function insert (datalist) {
    //批量将数据插入数据表games
    //插入语句
    var addData = "insert into tencent1(`name`,`src`,`nums`,`score`,`play`) values ?";
    //调用query函数完成数据的插入
    connection.query(addData, [datalist], function (err, rows, fields) {
        if(err){
            console.log('INSERT ERROR - ', err.message);
            return;
        }
        // console.log("插入数据成功");
        return 0;
    });
}

function startRequest(url) {
    https.get(url,function (res) {
        var html='';
        res.setEncoding('utf-8');
        res.on('data',function (chunk) {
            html+=chunk;
        });
        res.on('end',function () {

            // console.log(html.length);
            var $ = cheerio.load(html);
            // list是信息列表
            var list = $('.figures_list').children();
            list.each(function (index,item) {
                var videoData=[];
                // console.log(item);'
                var src=$(item).children().first().attr('href');
                var name=$('.figure_title',this).children().first().text().split(" ").join("").replace("第1季","第一季").replace("第2季","第二季");
                // 评分
                var score=$('.score_l',this).text()+$('.score_s',this).text();
                // 播放量
                var play=$('.figure_count .num',this).text();
                // 集数
                var nums=$('.figure_info',this).text();
                video={
                    name:name,
                    src:src,
                    nums:nums,
                    score:score,
                    play:play
                };
                // videoList.push({
                //     // id:id,
                //     name:name,
                //     src:src,
                //     nums:nums,
                //     score:score,
                //     count:count
                // });
                videoData.push([video.name,video.src,video.nums,video.score,video.play]);
                if(videoData!==[]){
                    // insert(videoData);
                }
            });
            // console.log(videoList);
            var nextLink='https://v.qq.com/x/list/cartoon'+$('.page_next').attr('href');
            console.log(nextLink);
            if(nextLink!=="https://v.qq.com/x/list/cartoonjavascript:;"){
                startRequest(nextLink);
            }else{
                console.log("数据存储完毕");
                return 0;
            }
        })
    })
}


// fetchPage=function (url) {
//     return new Promise(function (resovle, reject) {
//         startRequest(url);
//         resovle();
//     })
// };
// out=function () {
//   return new Promise(function (resovle, reject) {
//       // console.log("数据存储完毕");
//       resovle();
//   });
// };
// fn = async function () {
//     //这里需要同步加载
//     await fetchPage(url);
//     await out();
// }();

// 封装的函数
fetchPage=function(url){
    startRequest(url);
};

fetchPage(url);
