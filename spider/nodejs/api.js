var express=require('express');
var path=require('path');
var app=express();
var bodyParser=require('body-parser');


var mysql=require('mysql');
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

