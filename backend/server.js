/*
  server 后台服务
*/

var express = require('express');
var app = express();
var fs = require('fs');
var path = require('path');

//used to deal with CORS
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use('/api/test',  require('./api/test'));

// 用户登陆
app.use('/api/login', require('./api/login'));
// 相关信息设置
app.use('/api/getUser',    require('./api/getUser'));
app.use('/api/updateUser', require('./api/updateUser'));
app.use('/api/setting/getBasic',      require('./api/setting/getBasic'));
app.use('/api/setting/updateBasic',   require('./api/setting/updateBasic'));
app.use('/api/setting/getProfile',    require('./api/setting/getProfile'));
app.use('/api/setting/updateProfile', require('./api/setting/updateProfile'));
// 添加校验委托(申请)单、任务派发
app.use('/api/addApply',     require('./api/addApply'));
app.use('/api/getApplyList', require('./api/getApplyList'));
app.use('/api/assignTask',   require('./api/assignTask'));
// 校验员提交测试结果
app.use('/api/test/setPressure', require('./api/test/setPressure'));
// 校验记录的送审、审核、签发
app.use('/api/getTestList', require('./api/getTestList'));
app.use('/api/pendingTest', require('./api/pendingTest'));
app.use('/api/reviewTest',  require('./api/reviewTest'));
app.use('/api/issueTest',   require('./api/issueTest'));

app.get('/', function(req, res){
  res.send('dlrow olleh');
});

process.on('uncaughtException', function (err) {
  //打印出错误
  console.log(err);
  //打印出错误的调用栈方便调试
  // console.log(err.stack);
});

app.listen(3000);
console.log('Example app listening at http://localhost:3000');
