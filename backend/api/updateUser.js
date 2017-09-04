/*
  updateUser 更新用户信息（添加或修改）
*/

var fs   = require('fs');
var path = require('path');
var express = require('express');
var router  = express.Router();
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();

// 导入MySQL模块
var mysql = require('mysql');
var dbConfig = require('../db');

// 使用DB配置信息创建一个MySQL连接池
var pool = mysql.createPool( dbConfig.mysql );

// var selectSql     = 'SELECT username FROM user WHERE username = ? ';
var addUserSql    = 'INSERT INTO user SET ?';
var updateUserSql = 'UPDATE user SET ? WHERE username = ? ';

router.post('/', jsonParser, function(req, res, next) {
  // 从连接池获取连接
  pool.getConnection(function(err, connection) {
    // 获取前台页面传过来的参数
    var param = req.body;
    console.log('request updateUser: ', req.body);

    if(param.elecSig) {
      // 保存电子签名图片
      // 过滤data:URL
      var imgData  = param.elecSig.replace(/^data:image\/\w+;base64,/, '');
      var dataBuffer = new Buffer(imgData, 'base64');
      // 图片输出路径
      // var filenameOut = path.join(__dirname, '../report/template/'+param.name+'.png');

      // NOTE: For Linux System
      var filenameOut = path.join(__dirname, './report/template/'+encodeURI(param.name)+'.png');

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

    // 添加或修改用户信息
    if(param.action=='add') {
      var post = {
        username: param.username,
        password: param.password,
        name:     param.name,
        role:     param.role,
        remark:   param.remark
      };
      connection.query(addUserSql, [post, param.username], function(err, result) {
        connection.release();
        console.log("result updateUser: ", result);
        if(result) {
          res.json({code: 200, msg: '添加成功'});
        }else{
          res.json({code: 400, msg: '添加失败，请稍后再试'});
        }
        if(err) throw err;
      });
    } else {
      var post = {
        password: param.password,
        name:     param.name,
        role:     param.role,
        remark:   param.remark
      };
      connection.query(updateUserSql, [post, param.username], function(err, result) {
        connection.release();
        console.log("result updateUser: ", result);
        if(result) {
          res.json({code: 200, msg: '修改成功'});
        }else{
          res.json({code: 400, msg: '修改失败，请稍后再试'});
        }
        if(err) throw err;
      });
    }

  }); // end pool.getConnection
});


module.exports = router;
