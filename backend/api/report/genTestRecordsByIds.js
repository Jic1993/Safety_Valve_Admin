/*
  genTestRecordsByIds

  根据校验记录的Id数组 从数据库查询相关校验记录，创建校验记录EXCEL文件
*/

var mysql = require('mysql');
var dbConfig = require('../../db');
var genTestRecord = require('./genTestRecord');

// 使用DB配置信息创建一个MySQL连接池
var pool = mysql.createPool( dbConfig.mysql );

module.exports = function(ids) {
  console.log('genTestRecordsByIds ids: ', ids);
  // 从连接池获取连接
  pool.getConnection(function(err, connection) {
    var sql =  "SELECT *, \
    (SELECT remark FROM user WHERE username = 'CONFIG') as setting, \
    DATE_FORMAT(manufacture_date,'%Y-%m-%d') as formated_manufacture_date, \
    DATE_FORMAT(next_test_date,'%Y-%m-%d') as formated_next_test_date, \
    DATE_FORMAT(review_date,'%Y-%m-%d') as formated_review_date \
    FROM (SELECT * FROM test_record WHERE test_id IN "+ids+") test LEFT JOIN apply ON (test.apply_id = apply.id)";
    connection.query(sql, function(err, result) {
      connection.release();
      if(result) {
        console.log("result genTestRecordsByIds: ", result);
        result.map( e=>genTestRecord(e) );
      }
      if (err) throw err; // 似乎必须要放在最后，放最在上面会阻塞下面的res.json, 前台将得不到任何反馈。
    });
  });
}
