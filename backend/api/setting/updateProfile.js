/*
  updateProfile

  更新个人资料信息，如姓名，用户名，密码等
*/

var fs   = require('fs');
var path = require('path');
var express = require('express');
var router  = express.Router();
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();

// 导入MySQL模块
var mysql = require('mysql');
var dbConfig = require('../../db');

// 使用DB配置信息创建一个MySQL连接池
var pool = mysql.createPool( dbConfig.mysql );

var updateProfileSql = 'UPDATE user SET ? WHERE username = ? ';

//
router.post('/', jsonParser, function(req, res, next) {
  // 从连接池获取连接
  pool.getConnection(function(err, connection) {
    // 获取前台页面传过来的参数
    var param = req.body;
    console.log('request updateProfile: ', req.body);

    if(param.elecSig) {
      // 保存电子签名图片
      // 过滤data:URL
      var imgData  = param.elecSig.replace(/^data:image\/\w+;base64,/, '');
      var dataBuffer = new Buffer(imgData, 'base64');
      // 图片输出路径
      // var filenameOut = path.join(__dirname, '../report/template/'+param.name+'.png');

      // NOTE: For Linux System
      var filenameOut = path.join(__dirname, '../report/template/'+encodeURI(param.name)+'.png');

      console.log('filenameOut: ', filenameOut);
      // 写入文件
      fs.writeFile(filenameOut, dataBuffer, function(err){
          if(err){
              // res.send(err);
              console.log("ERROR: ", err);
          }else{
              // res.send('保存成功');
              console.log("Save elecSig success!");
          }
      });
    }


    var post = { name: param.name, remark: param.remark };
    // 建立连接
    connection.query(updateProfileSql, [post, param.username], function(err, result) {
      connection.release();
      console.log("result updateProfile: ", result);
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
