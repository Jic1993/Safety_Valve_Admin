/*
  login 用户登陆接口
*/

var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();

// 导入MySQL模块
var mysql = require('mysql');
var dbConfig = require('../db');

// 使用DB配置信息创建一个MySQL连接池
var pool = mysql.createPool( dbConfig.mysql );

var loginSql = 'SELECT *, (SELECT remark FROM user WHERE username="CONFIG") AS setting FROM user WHERE username = ? AND password = ?';

//
router.post('/', jsonParser, function(req, res, next) {
  console.log('login...');
  // 从连接池获取连接
  pool.getConnection(function(err, connection) {
    // 获取前台页面传过来的参数
    var param = req.body;
    console.log('request login: ', req.body);
    // 建立连接 查询用户信息
    connection.query(loginSql, [param.username, param.password], function(err, result) {
      // 释放连接
      connection.release();
      // 以json形式，把操作结果返回给前台页面
      if(result[0]) {
        console.log('result login: ', result);
        res.json({code: 200, msg: '登陆成功', data: result[0]});
      }else{
        res.json({code: 400, msg: '用户名/密码错误'});
      }
      if (err) throw err;
    });
  });
});

module.exports = router;
