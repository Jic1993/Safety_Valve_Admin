/*
  assignTask 派发校验任务，并生成校验委托单
*/

var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();
var mysql = require('mysql');
var dbConfig = require('../db');
var genTestApplysByIds = require('./report/genTestApplysByIds');

// 使用DB配置信息创建一个MySQL连接池
var pool = mysql.createPool( dbConfig.mysql );

var assignTaskSql = "UPDATE apply SET assigned = 'Y' WHERE id IN ";

// 添加校验申请单到数据库
router.post('/', jsonParser, function(req, res, next) {
  // 从连接池获取连接
  pool.getConnection(function(err, connection) {
    // 获取前台页面传过来的参数
    var param = req.body;
    console.log('request assignTask: ', req.body);

    // 建立连接 添加记录
    connection.query(assignTaskSql+param.ids, function(err, result) {
      // 以json形式，把操作结果返回给前台页面
      if(result) {
        console.log("result assignTask: ", result);
        // TODO：生成委托申请单
        genTestApplysByIds(param.ids);

        res.json({code: 200, msg: '任务派发成功'});
      }else{
        res.json({code: 400, msg: '派发失败，请稍后再试'});
      }
      // 释放连接
      connection.release();
      if (err) throw err; //似乎必须要放在最后，放最在上面会阻塞下面的res.json, 前台将得不到任何反馈。
    });
  });
});

module.exports = router;
