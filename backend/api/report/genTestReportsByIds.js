/*
  genTestReportsByIds

  根据校验记录的Id数组 从数据库查询相关校验记录，创建校验报告EXCEL文件
*/

var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();
var mysql = require('mysql');
var dbConfig = require('../../db');
var util = require('../utils/formatDate');
var genTestReport = require('./genTestReport');

// 使用DB配置信息创建一个MySQL连接池
var pool = mysql.createPool( dbConfig.mysql );

module.exports = function(ids) {
  console.log('ids: ', ids);

  // 从连接池获取连接
  pool.getConnection(function(err, connection) {
    var sql =  "SELECT *, \
    (SELECT remark FROM user WHERE username = 'CONFIG') as setting, \
    DATE_FORMAT(test_date,'%Y-%m-%d') as formated_test_date, \
    DATE_FORMAT(next_test_date,'%Y-%m-%d') as formated_next_test_date, \
    DATE_FORMAT(review_date,'%Y-%m-%d') as formated_review_date, \
    DATE_FORMAT(issue_date,'%Y-%m-%d') as formated_issue_date \
    FROM (SELECT * FROM test_record WHERE test_id IN "+ids+") test LEFT JOIN apply ON (test.apply_id = apply.id)";
    connection.query(sql, function(err, result) {
      connection.release();
      if(result) {
        console.log("result genTestReportsByIds: ", result);
        result.map( e=>genTestReport(e) );
      }
      if (err) throw err; // 似乎必须要放在最后，放最在上面会阻塞下面的res.json, 前台将得不到任何反馈。
    });
  });
}
