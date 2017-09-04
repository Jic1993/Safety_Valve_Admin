/*
  genBook 生成台账

  文件名以年份开头，每到新的一年重新生成一个EXCEL文件
*/

var fs = require('fs');
var path = require('path');
var Excel = require('exceljs');
var setting = require('./reportSetting_en');

var excelTemplate = [
  // {col: 2,  attr: 'number'},
  {col: 3,  attr: 'formated_issue_date'},
  {col: 4,  attr: 'company_name'},
  {col: 5,  attr: 'device_name'},
  {col: 6,  attr: 'device_code'},
  {col: 7,  attr: 'safety_valve_code'},
  {col: 8,  attr: 'nominal_diameter'},
  {col: 9,  attr: 'set_pressure'},
  {col: 10, attr: 'test_result'},
  {col: 11, attr: 'test_id'},
  {col: 12, attr: 'tester_name'},
  {col: 13, attr: 'contact_person'},
];

var border = {
  top:    {style:'thin'},
  left:   {style:'thin'},
  bottom: {style:'thin'},
  right:  {style:'thin'}
};

// 测试数据
var results1 = [
  {
    issue_date: '2017-08-20',
    company_name: '张家港',
    device_name: 'sdsd四杀',
    device_code: 'sdsaaSSAA',
    safety_valve_code: 'A121XXX-aas',
    nominal_diameter: '40',
    set_pressure: 0.80,
    test_result: '合格',
    test_id: '0871122',
    tester_name: '小路',
    contact_person: '马先生',
  },
  {
    issue_date: '2017-08-22',
    company_name: '张家港',
    device_name: 'sdsd四杀ewq',
    device_code: 'sdsaaSSAA',
    safety_valve_code: 'A121XwXX-aas',
    nominal_diameter: '4e0',
    set_pressure: 0.80,
    test_result: '合格',
    test_id: '08711122',
    tester_name: '小路xx',
    contact_person: '马s先生',
  }
];


module.exports =  function genBook(results){
  var filenameIn = setting.bookTemplatePath;
  var outPath = setting.bookOutPath;
  var filenameOut = path.join(outPath, setting.bookFilename);

  // 同步判断文件是否存在
  var exist = fs.existsSync(filenameOut);

  if(exist) {
    var workbook = new Excel.Workbook();
    workbook.xlsx.readFile(filenameOut)
    .then(function() {
      var options = {
        useSharedStrings: true,
        useStyles: true
      };
      console.log('already has file: ', filenameOut);

      var worksheet = workbook.getWorksheet(1);
      console.log(worksheet.name);

      var startNum = worksheet.lastRow.getCell(2).value;

      results.map( e=> {
        var rowValues = [];
        rowValues[2] = ++startNum;
        for( var i=0; i<excelTemplate.length; ++i) {
          rowValues[excelTemplate[i].col]= e[ excelTemplate[i].attr ] ;
        }
        var row = worksheet.addRow(rowValues);
        // 给每个cell加上border
        row.eachCell({ includeEmpty: true }, function(cell, colNumber) {
          if(colNumber==1) return;
          cell.border = border;
        });

      });

      return workbook.xlsx.writeFile(filenameOut, options)
      .then(function(){
        console.log('Done.');
      })
    })
    .catch(function(error) {
      console.error(error.message);
      console.error(error.stack);
    });

  } else {

    var workbook = new Excel.Workbook();
    workbook.xlsx.readFile(filenameIn)
    .then(function() {
      var options = {
        useSharedStrings: true,
        useStyles: true
      };
      // 创建输出目录
      setting.mkdirsSync(outPath);

      console.log('create new file: ', filenameOut);

      var worksheet = workbook.getWorksheet(1);
      // 去掉文件后缀名
      worksheet.name = path.basename(setting.bookFilename, '.xlsx');
      console.log(worksheet.name);

      var startNum = 0;

      results.map( e=> {
        var rowValues = [];
        rowValues[2] = ++startNum;
        for( var i=0; i<excelTemplate.length; ++i) {
          rowValues[excelTemplate[i].col]= e[ excelTemplate[i].attr ] ;
        }
        var row = worksheet.addRow(rowValues);
        // 给每个cell加上border
        row.eachCell({ includeEmpty: true }, function(cell, colNumber) {
          if(colNumber==1) return;
          cell.border = border;
        });

      });

      return workbook.xlsx.writeFile(filenameOut, options)
      .then(function(){
        console.log('Done.');
      })
    })
    .catch(function(error) {
      console.error(error.message);
      console.error(error.stack);
    });

  } // end if

}
