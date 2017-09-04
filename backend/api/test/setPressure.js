/*
  setPressure 提交整定压力检验结果
*/

var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();
var mysql = require('mysql');
var dbConfig = require('../../db');

// 使用DB配置信息创建一个MySQL连接池
var pool = mysql.createPool( dbConfig.mysql );

var testRecordSql = 'UPDATE test_record SET ? WHERE test_id = ?';

// 提交整定压力检验结果
router.post('/', jsonParser, function(req, res, next) {
  // 从连接池获取连接
  pool.getConnection(function(err, connection) {
    // 获取前台页面传过来的参数
    var param = req.body;
    console.log('request setPressure: ', req.body);

    var post = { tester_name:    param.tester_name,
                 set_pressure:   param.set_pressure,
                 set_pressure1:  param.set_pressure1,
                 set_pressure2:  param.set_pressure2,
                 set_pressure3:  param.set_pressure3,
                 test_result:    param.test_result,
                 test_date:      param.test_date,
                 next_test_date: param.next_test_date,
               };
    console.log('post: ', post);
    // 建立连接 添加任务记录
    connection.query(testRecordSql, [post, param.test_id], function(err, result) {
      console.log('result setPressure: ', result);
      // 以json形式，把操作结果返回给前台页面
      if(result) {
        res.json({code: 200, msg: '提交成功'});
      }else{
        res.json({code: 400, msg: '提交失败，请稍后再试'});
      }
      // 释放连接
      connection.release();
      if (err) throw err;
    });
  });
});

module.exports = router;
