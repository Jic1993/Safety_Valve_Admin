/*
  getTestList 获取校验记录数据

  为了方便 直接对用户身份做了判断，查询不同条件的校验记录数据

*/

var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();
var mysql = require('mysql');
var dbConfig = require('../db');

// 使用DB配置信息创建一个MySQL连接池
var pool = mysql.createPool( dbConfig.mysql );
// For Tester
var getTestingListSql = "SELECT *, DATE_FORMAT(accept_date,'%Y-%m-%d %H:%i') as formated_accept_date, \
DATE_FORMAT(appointment_date,'%Y-%m-%d %H:%i') as formated_appointment_date, \
DATE_FORMAT(manufacture_date,'%Y-%m-%d') as formated_manufacture_date \
FROM (SELECT * FROM test_record WHERE test_result = '待校验') test \
LEFT JOIN apply ON (test.apply_id = apply.id AND apply.assigned = 'Y') WHERE apply.assigned = 'Y'";
// For Typer
var getPendingListSql = "SELECT *, DATE_FORMAT(accept_date,'%Y-%m-%d %H:%i') as formated_accept_date, \
DATE_FORMAT(appointment_date,'%Y-%m-%d %H:%i') as formated_appointment_date, \
DATE_FORMAT(manufacture_date,'%Y-%m-%d') as formated_manufacture_date, \
DATE_FORMAT(test_date,'%Y-%m-%d %H:%i') as formated_test_date, \
DATE_FORMAT(next_test_date,'%Y-%m-%d') as formated_next_test_date \
FROM (SELECT * FROM test_record WHERE reviewer_name IS NULL AND issuer_name IS NULL AND test_result = '合格') test \
LEFT JOIN apply ON (test.apply_id = apply.id)";
// For Reviewer
var getReviewListSql  = "SELECT *, DATE_FORMAT(accept_date,'%Y-%m-%d %H:%i') as formated_accept_date, \
DATE_FORMAT(appointment_date,'%Y-%m-%d %H:%i') as formated_appointment_date, \
DATE_FORMAT(manufacture_date,'%Y-%m-%d') as formated_manufacture_date, \
DATE_FORMAT(test_date,'%Y-%m-%d %H:%i') as formated_test_date, \
DATE_FORMAT(next_test_date,'%Y-%m-%d') as formated_next_test_date \
FROM (SELECT * FROM test_record WHERE reviewer_name = 'pending') test \
LEFT JOIN apply ON (test.apply_id = apply.id)";
// For Issuer
var getIssueListSql   = "SELECT *, DATE_FORMAT(accept_date,'%Y-%m-%d %H:%i') as formated_accept_date, \
DATE_FORMAT(appointment_date,'%Y-%m-%d %H:%i') as formated_appointment_date, \
DATE_FORMAT(manufacture_date,'%Y-%m-%d') as formated_manufacture_date, \
DATE_FORMAT(test_date,'%Y-%m-%d %H:%i') as formated_test_date, \
DATE_FORMAT(next_test_date,'%Y-%m-%d') as formated_next_test_date, \
DATE_FORMAT(review_date,'%Y-%m-%d %H:%i') as formated_review_date \
FROM (SELECT * FROM test_record WHERE issuer_name = 'pending') test \
LEFT JOIN apply ON (test.apply_id = apply.id)";

router.post('/', jsonParser, function(req, res, next) {
  // 从连接池获取连接
  pool.getConnection(function(err, connection) {
    // 获取前台页面传过来的参数
    var param = req.body;
    console.log('request getTestList: ', req.body);
    switch(param.role) {
      case 'typer'    : getTestListSql = getPendingListSql; break;
      case 'tester'   : getTestListSql = getTestingListSql; break;
      case 'reviewer' : getTestListSql = getReviewListSql;  break;
      case 'issuer'   : getTestListSql = getIssueListSql;   break;
      default: break;
    }
    // 建立连接 查询数据
    connection.query(getTestListSql, function(err, result) {
      // 以json形式，把操作结果返回给前台页面
      res.json({code: 200, msg: 'query getTestList success!', data: result});
      // 释放连接
      connection.release();
      if (err) throw err;
    });
  });
});

module.exports = router;
