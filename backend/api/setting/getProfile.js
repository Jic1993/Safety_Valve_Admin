/*
  getProfile

  查询个人资料信息，如姓名，用户名，密码等
*/

var fs   = require('fs');
var path = require('path');
var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();
var mysql = require('mysql');
var dbConfig = require('../../db');

// 使用DB配置信息创建一个MySQL连接池
var pool = mysql.createPool( dbConfig.mysql );

var getProfileSql = 'select name from user WHERE username = ?';

// function to encode file data to base64 encoded string
function base64_encode(file) {
  // read binary data
  var bitmap = fs.readFileSync(file);
  // convert binary data to base64 encoded string
  return new Buffer(bitmap).toString('base64');
}

//
router.get('/', jsonParser, function(req, res, next) {
  // 从连接池获取连接
  pool.getConnection(function(err, connection) {
    // 获取前台页面传过来的参数
    var param = req.body;
    console.log('request: ', req.body);


    // 建立连接
    connection.query(getProfileSql, function(err, result) {
      if (err) throw err;

      console.log("result: ", result);
      // 以json形式，把操作结果返回给前台页面
      if(result[0]) {
        res.json({code: 200, msg: '查询成功', data: result[0]});
      }else{
        res.json({code: 400, msg: '服务器繁忙，请稍后再试'});
      }
      // 释放连接
      connection.release();
    });
  });
});


module.exports = router;
