/*
  genBooksByIds

  根据校验记录的Id数组 从数据库查询相关校验记录，创建台账

  NOTE： 初步暂定  写入台账时间为校验记录被签发之后
*/

var mysql = require('mysql');
var dbConfig = require('../../db');
var genBook = require('./genBook');

// 使用DB配置信息创建一个MySQL连接池
var pool = mysql.createPool( dbConfig.mysql );

module.exports = function(ids) {
  console.log('genBooksByIds ids: ', ids);
  // 从连接池获取连接
  pool.getConnection(function(err, connection) {
    var sql =  "SELECT *, \
    DATE_FORMAT(issue_date,'%Y-%m-%d') as formated_issue_date \
    FROM (SELECT * FROM test_record WHERE test_id IN "+ids+") test LEFT JOIN apply ON (test.apply_id = apply.id)";
    connection.query(sql, function(err, result) {
      connection.release();
      if(result) {
        console.log("result genBooksByIds: ", result);
        genBook(result);
      }
      if (err) throw err; // 似乎必须要放在最后，放最在上面会阻塞下面的res.json, 前台将得不到任何反馈。
    });
  });
}
