var fs = require('fs');
var path = require('path');
var Excel = require('exceljs');

function padding(s) {
    return s < 10 ? '0' + s : s;
}
function getDate(date) {
    return date.getFullYear()+'年'+padding(date.getMonth()+1)+'月'+padding(date.getDate())+'日';
}

// function mkdirs(dirpath, callback) {
//     fs.stat(dirpath, function (err, stats) {
//         if(!err) {
//             console.log(1);
//             callback();
//         } else {
//                 console.log(path.dirname(dirpath));
//                 //创建父目录，然后再创建当前目录
//                 mkdirs(path.dirname(dirpath), function(){
//                     console.log(dirpath);
//                     fs.mkdir(dirpath, callback);
//                 });
//         }
//     });
// };

function mkdirsSync(dirpath) {
    if(!fs.existsSync(dirpath)) {
        mkdirsSync(path.dirname(dirpath));
        fs.mkdirSync(dirpath);
    }
}



var filenameIn  = path.join(__dirname, 'template/校验报告.xlsx');
var filenameOut = path.join(__dirname, 'excel/outt.xlsx');

report_date = "2017-07-20 15:15:41";
var date = getDate(new Date(report_date));

// console.log("创建目录");

var p = './excel1/校验报告/'+date;



mkdirsSync(p);

 
// fs.stat(p, function (err, stats) {
//    if (err) {
//        console.log(path.dirname(p));
//        return console.error(err);
//    }
//    console.log(stats);
//    console.log("读取文件信息成功！");
   
//    // 检测文件类型
//    console.log("是否为文件(isFile) ? " + stats.isFile());
//    console.log("是否为目录(isDirectory) ? " + stats.isDirectory());    
// });



// fs.mkdir("./excel1",function(err){
//    if (err) {
//        return console.error(err);
//    }
//    console.log("目录创建成功。");
// });

// console.log(fs.statSync('./excel1'));

// fs.readdir("./excel1",function(err){
//    if (err) {
//         console.error(err);
//         fs.mkdir("./excel1",function(err){
//             if (err) {
//                 return console.error(err);
//             }
//             console.log('目录创建成功');
//         });
//    }
// });

