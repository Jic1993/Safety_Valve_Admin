// 创建校验记录：
// 根据校验申请单表 `apply` 中的 `id` `task_num` 在校验记录表 `test_recoed` 中生成相应的校验记录

// NOTE: 初步实现中 暂定为 在申请单创建的之后，立即创建相应的校验记录

// var express = require('express');
// var router = express.Router();

// 导入MySQL模块
var mysql = require('mysql');
var dbConfig = require('../../db');
// 使用DB配置信息创建一个MySQL连接池
var pool = mysql.createPool( dbConfig.mysql );

//一次插入多条记录，例如： INSERT INTO test_record(apply_id) VALUES (5),(5),(5);
var addMultiSql = 'INSERT INTO test_record(apply_id) VALUES ';

module.exports =  function  assignTasks(params){

  var {id, task_num} = params;
  var value = '('+id+')';
  for(var i=2; i<=task_num; ++i) {
    value += ',('+id+')';
  }
  console.log('insert value: ',value);

  // 从连接池获取连接 
  pool.getConnection(function(err, connection) {
    connection.beginTransaction(function(err) {
      if (err) { throw err; }
      connection.query(addMultiSql+value, function (error, results, fields) {
        if (error) {
          console.log('createTestTasks fail!');
          return connection.rollback(function() {
            throw error;
          });
        }
        connection.commit(function(err) {
          if (err) {
            return connection.rollback(function() {
              throw err;
            });
          }
          console.log('createTestTasks success!');
          // 释放连接  
          connection.release();
        });
        // var log = 'Post ' + results.insertId + ' added';
        // connection.query('INSERT INTO log SET data=?', log, function (error, results, fields) {
        //   if (error) {
        //     return connection.rollback(function() {
        //       throw error;
        //     });
        //   }
        //   connection.commit(function(err) {
        //     if (err) {
        //       return connection.rollback(function() {
        //         throw err;
        //       });
        //     }
        //     console.log('success!');
        //   });
        // });
      }); //end query
    }); //end beginTransaction
  });
}
