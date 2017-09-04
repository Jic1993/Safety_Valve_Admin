var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
 
// 创建 application/x-www-form-urlencoded 编码解析
var urlencodedParser = bodyParser.urlencoded({ extended: false });

// 导入MySQL模块
var mysql = require('mysql');
var dbConfig = require('../db');

// 使用DB配置信息创建一个MySQL连接池
var pool = mysql.createPool( dbConfig.mysql );

var loginsql = 'SELECT * FROM user WHERE username = ? AND password = ?';

// 添加用户
router.post('/', urlencodedParser, function(req, res, next) {
  // 从连接池获取连接 
  pool.getConnection(function(err, connection) { 
    // 获取前台页面传过来的参数  
    var param = req.body;
    console.log(req.body);
    // 建立连接 查询用户信息 
    connection.query(loginsql, [param.username, param.password], function(err, result) {
      if (err) throw err;
      console.log(result);
      // 以json形式，把操作结果返回给前台页面     
      if(result[0]) {
        console.log(result);
        res.json({code: 200, msg: 'login success'});
      }else{
        res.json({code: 400, msg: 'login failed'});
      }
      // 释放连接  
      connection.release();
    });
  });
});


module.exports = router;