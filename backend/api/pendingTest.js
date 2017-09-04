/*
  pendingTest 校验记录提交送审

  把校验员已完成校验的安全阀的校验记录变成 `pending` 状态，
  审核部分依此去查询待审核记录
*/

var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();
var mysql = require('mysql');

var dbConfig = require('../db');
// 使用DB配置信息创建一个MySQL连接池
var pool = mysql.createPool( dbConfig.mysql );

var pendingTestSql = "UPDATE test_record SET reviewer_name = 'pending' WHERE test_id IN ";

// 添加校验申请单到数据库
router.post('/', jsonParser, function(req, res, next) {
  // 从连接池获取连接
  pool.getConnection(function(err, connection) {
    // 获取前台页面传过来的参数
    var param = req.body;
    console.log('request pendingTest: ', req.body);
    // 建立连接 添加记录
    connection.query(pendingTestSql+param.ids, function(err, result) {
      // 以json形式，把操作结果返回给前台页面
      if(result) {
        console.log("result pendingTest: ", result);
        res.json({code: 200, msg: '送审成功'});
      }else{
        res.json({code: 400, msg: '送审失败，请稍后再试'});
      }
      // 释放连接
      connection.release();
      if (err) throw err; // 似乎必须要放在最后，放最在上面会阻塞下面的res.json, 前台将得不到任何反馈。
    });
  });
});

module.exports = router;
