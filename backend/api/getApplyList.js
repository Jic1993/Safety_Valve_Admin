/*
  getApplyList 获取尚未派发的校验委托（申请）单记录

*/

var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var dbConfig = require('../db');
// 使用DB配置信息创建一个MySQL连接池
var pool = mysql.createPool( dbConfig.mysql );

var getApplyListSql = "SELECT *, DATE_FORMAT(accept_date,'%Y-%m-%d %H:%i') as formated_accept_date, \
DATE_FORMAT(appointment_date,'%Y-%m-%d %H:%i') as formated_appointment_date, \
DATE_FORMAT(manufacture_date,'%Y-%m-%d') as formated_manufacture_date \
FROM apply where assigned = 'N' ";

//
router.get('/', function(req, res, next) {
  // 从连接池获取连接
  pool.getConnection(function(err, connection) {
    // 获取前台页面传过来的参数
    // var param = req.body;
    // console.log('request getApplyList: ', req.body);
    // 建立连接 查询用户信息
    connection.query(getApplyListSql, function(err, result) {
      console.log('response getApplyList: ', result);
      // 以json形式，把操作结果返回给前台页面
      res.json({code: 200, msg: 'query not-assigned applys success!', data: result});
      // 释放连接
      connection.release();
      if (err) throw err;
    });
  });
});

module.exports = router;
