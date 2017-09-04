// 仅测试用 ！！！

var express = require('express');
var router = express.Router();
var createTestTasks = require('./test/createTestTasks');

// 导入MySQL模块
var mysql = require('mysql');
var dbConfig = require('../db');

// 使用DB配置信息创建一个MySQL连接池
var pool = mysql.createPool( dbConfig.mysql );

// 
router.get('/', function(req, res, next) {

  params = {
    id: 5,
    task_num: 2,
  }
  createTestTasks(params);
  res.json({code: 200, msg: '成功'});
});

module.exports = router;