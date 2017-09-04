/*
  genTestAppplysByIds 根据校验委托申请单的Id数组 从数据库查询相关记录，创建EXCEL文件
*/

var mysql = require('mysql');
var dbConfig = require('../../db');
var genApply = require('./genApply');

// 使用DB配置信息创建一个MySQL连接池
var pool = mysql.createPool( dbConfig.mysql );

module.exports = function(ids) {
  console.log('genTestAppplysByIds ids: ', ids);
  // 从连接池获取连接
  pool.getConnection(function(err, connection) {
    var sql =  "SELECT * FROM apply WHERE id IN "+ids;
    connection.query(sql, function(err, result) {
      connection.release();
      if(result) {
        console.log("result genTestAppplysByIds: ", result);
        result.map( e=>genApply(e) );
      }
      if (err) throw err; // 似乎必须要放在最后，放最在上面会阻塞下面的res.json, 前台将得不到任何反馈。
    });
  });
}
