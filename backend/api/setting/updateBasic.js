/*
  updateBasic

  更新基础配置信息，如校验机构核准证号，执行标准等。
*/

var express = require('express');
var router  = express.Router();
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();
var mysql    = require('mysql');
var dbConfig = require('../../db');

// 使用DB配置信息创建一个MySQL连接池
var pool = mysql.createPool( dbConfig.mysql );

var updateBasicSql = 'UPDATE user SET ? WHERE username = "CONFIG" ';

//
router.post('/', jsonParser, function(req, res, next) {
  // 从连接池获取连接
  pool.getConnection(function(err, connection) {
    // 获取前台页面传过来的参数
    var param = req.body;
    console.log('request updateBasic: ', req.body);

    var post  = { remark: param.setting };
    // 建立连接
    connection.query(updateBasicSql, post, function(err, result) {
      connection.release();
      console.log("result updateBasic: ", result);
      if(result) {
        res.json({code: 200, msg: '设置成功'});
      }else{
        res.json({code: 400, msg: '服务器繁忙，请稍后再试'});
      }
      if(err) throw err;
    });
  });
});


module.exports = router;
