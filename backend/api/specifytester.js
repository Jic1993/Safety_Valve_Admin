var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
 
var jsonParser = bodyParser.json();

// 导入MySQL模块
var mysql = require('mysql');
var dbConfig = require('../db');

// 使用DB配置信息创建一个MySQL连接池
var pool = mysql.createPool( dbConfig.mysql );

var testersql = 'UPDATE apply SET tester = ? WHERE id IN ';

// 添加用户
router.post('/', jsonParser, function(req, res, next) {
  // 从连接池获取连接 
  pool.getConnection(function(err, connection) { 
    // 获取前台页面传过来的参数  
    var param = req.body;
    console.log(req.body);

    var post = [param.tester];

    // 建立连接 添加任务记录
    connection.query(testersql+param.ids, post, function(err, result) {
      console.log(post);
      if (err) throw err;

      console.log("affectedRowsId: ");
      console.log(result.affectedRows);
      // 以json形式，把操作结果返回给前台页面     
      if(result.affectedRows) {
        res.json({code: 200, msg: 'update success'});
      }else{
        res.json({code: 400, msg: 'update failed'});
      }
      // 释放连接  
      connection.release();
    });
  });
});


module.exports = router;