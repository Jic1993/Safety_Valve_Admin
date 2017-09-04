var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var dbConfig = require('../db');

// 使用DB配置信息创建一个MySQL连接池
var pool = mysql.createPool( dbConfig.mysql );
// 查询所有待校验且已经派发了的任务
var unFinishedTestsSql = "SELECT * from (SELECT * FROM test_record WHERE test_result = '待校验') test \
LEFT JOIN apply ON (test.apply_id = apply.id AND apply.assigned = 'Y') WHERE apply.assigned = 'Y'";

// 
router.get('/', function(req, res, next) {
  pool.getConnection(function(err, connection) { 
    // var param = req.body;
    console.log('request unFinishedTests: ', req.body);
    connection.query(unFinishedTestsSql, function(err, result) {
      console.log('result unFinishedTests: ', result);
      res.json({code: 200, msg: 'query success', data: result});
      connection.release();
      if (err) throw err;      
    });
  });
});

module.exports = router;
