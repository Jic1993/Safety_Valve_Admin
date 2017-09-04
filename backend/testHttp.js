var fs   = require('fs');
var path = require('path');


console.log(encodeURI("小路"));

// 异步读取
fs.readFile('/input.txt', function (err, data) {
    if (err) {
        return console.error(err);
    }
    console.log("异步读取: " + data.toString());
 });
