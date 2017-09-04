/*
  issueTest 签发校验记录

  NOTE: 初步实现中 暂定为 在校验记录被签发之后，创建相应的校验报告EXCEL文档，
  并且将该校验记录写入台账EXCEL文件。

*/

var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();
var util = require('./utils/formatDate');
var genTestReportsByIds = require('./report/genTestReportsByIds');
var genBooksByIds = require('./report/genBooksByIds');

// 导入MySQL模块
var mysql = require('mysql');
var dbConfig = require('../db');
// 使用DB配置信息创建一个MySQL连接池
var pool = mysql.createPool( dbConfig.mysql );

var issueTestSql = "UPDATE test_record SET issue_date = ?, issuer_name = ? WHERE test_id IN ";

// 添加校验申请单到数据库
router.post('/', jsonParser, function(req, res, next) {
  // 从连接池获取连接
  pool.getConnection(function(err, connection) {
    // 获取前台页面传过来的参数
    var param = req.body;
    console.log('request issueTest: ', req.body);

    var nowDate = util.formatDate.format(new Date(),'yyyy-MM-dd hh:mm:ss');
    // 建立连接 添加记录
    connection.query(issueTestSql+param.ids, [nowDate, param.name], function(err, result) {
      // 以json形式，把操作结果返回给前台页面
      if(result) {
        console.log("result issueTest: ", result);

        // TODO：生成校验报告
        genTestReportsByIds(param.ids);
        // 写入台账
        genBooksByIds(param.ids);

        res.json({code: 200, msg: '签发成功'});
      }else{
        res.json({code: 400, msg: '签发失败，请稍后再试'});
      }
      // 释放连接
      connection.release();
      if (err) throw err; // 似乎必须要放在最后，放最在上面会阻塞下面的res.json, 前台将得不到任何反馈。
    });
  });
});

module.exports = router;
