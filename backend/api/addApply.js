/*
  addApply

  添加委托申请单和对应的校验记录：
  首先添加申请记录，
  然后根据校验申请单表 `apply` 中的 `id`和`task_num` 在校验记录表 `test_recoed` 中生成相应的校验记录

  NOTE: 初步实现中 暂定为 在申请单创建的之后，立即创建相应的校验记录, 之后再想更好地实现方式。
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

// 添加一条委托申请单记录
var addApplySql = 'INSERT INTO apply SET ?';
// 一次插入多条与委托单对应的校验记录，例如(委托单ID为5时)： INSERT INTO test_record(apply_id) VALUES (5),(5),(5);
var addMultiTestsSql = 'INSERT INTO test_record(apply_id) VALUES ';

// 添加校验申请单到数据库
router.post('/', jsonParser, function(req, res, next) {
  var param = req.body;
  console.log('request addApply: ', req.body);

  // 从连接池获取连接
  pool.getConnection(function(err, connection) {
    console.log('error getConnection: ',err)
    // res.json({code: 400, msg: '服务器繁忙，请稍后再试'});
    connection.beginTransaction(function(err) {
      console.log('error beginTransaction: ',err)
      // res.json({code: 400, msg: '服务器繁忙，请稍后再试'});
      if (err) { throw err; }
      connection.query(addApplySql, param, function (error, results, fields) {
        if (error) {
          res.json({code: 400, msg: '服务器繁忙，请稍后再试'});
          return connection.rollback(function() {
            console.log('addApply fail!');
            throw error;
          });
        }
        console.log('addApply success!');

        var id = results.insertId;
        var task_num = param.task_num;
        var value = '('+id+')';
        for(var i=2; i<=task_num; ++i) {
          value += ',('+id+')';
        }
        console.log('test_record insert value: ',value);

        connection.query(addMultiTestsSql+value, function (error, results, fields) {
          if (error) {
            res.json({code: 400, msg: '服务器繁忙，请稍后再试'});
            return connection.rollback(function() {
              console.log('addTestTasks fail!');
              throw error;
            });
          }
          connection.commit(function(err) {
            if (err) {
              res.json({code: 400, msg: '服务器繁忙，请稍后再试'});
              return connection.rollback(function() {
                throw err;
              });
            }
            console.log('addTestTasks success!');
            console.log('result: ', results);
            res.json({code: 200, msg: '委托单添加成功', data: {insertId: id}});
            // 释放连接
            connection.release();
          });
        });

      }); //end query
    }); //end beginTransaction
  }); //end getConnection
});

module.exports = router;
