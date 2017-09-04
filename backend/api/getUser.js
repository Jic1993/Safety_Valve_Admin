/*
  getUser 获取用户数据

*/

var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();
var mysql = require('mysql');
var dbConfig = require('../db');

// 使用DB配置信息创建一个MySQL连接池
var pool = mysql.createPool( dbConfig.mysql );

var getUserSql = "SELECT * FROM user WHERE username != 'CONFIG'";

router.get('/', jsonParser, function(req, res, next) {
  // 从连接池获取连接
  pool.getConnection(function(err, connection) {
    // 获取前台页面传过来的参数
    var param = req.body;
    console.log('request getUser: ', req.body);
    // 建立连接 查询数据
    connection.query(getUserSql, function(err, result) {
      connection.release();
      res.json({code: 200, msg: 'query getUser success!', data: result});
      if (err) throw err;
    });
  });
});

module.exports = router;
