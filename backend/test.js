/*
  测试数据库连接
*/


var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '123456',
  database : 'test'
});

connection.connect();

connection.query("SELECT remark FROM user WHERE username = 'CONFIG'", function (error, results, fields) {
  if (error) throw error;
  console.log('The results is: ', results);
});
