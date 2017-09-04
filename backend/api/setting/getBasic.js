var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');

var jsonParser = bodyParser.json();

// 导入MySQL模块
var mysql = require('mysql');
var dbConfig = require('../../db');

// 使用DB配置信息创建一个MySQL连接池
var pool = mysql.createPool( dbConfig.mysql );

var getSettingSql = 'SELECT remark FROM user WHERE username = "CONFIG" ';

//
router.get('/', jsonParser, function(req, res, next) {
  // 从连接池获取连接
  pool.getConnection(function(err, connection) {
    // 获取前台页面传过来的参数
    var param = req.body;
    console.log('request: ', req.body);

    // 建立连接
    connection.query(getSettingSql, function(err, result) {
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
