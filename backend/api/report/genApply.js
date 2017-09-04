/*
  genApply 生成校验委托（申请）单EXCEL文件
*/

var fs = require('fs');
var path = require('path');
var Excel = require('exceljs');
var setting = require('./reportSetting_en');

var excelTemplate = [
  {unitAddress: 'M3',  attr: 'id_with_prefix'},
  {unitAddress: 'D4',  attr: 'company_name'},
  {unitAddress: 'H4',  attr: 'addr'},
  {unitAddress: 'L4',  attr: 'contact_person'},
  {unitAddress: 'N4',  attr: 'contact_number'},

  {unitAddress: 'B6',  attr: 'id'},
  {unitAddress: 'C6',  attr: 'device_name'},
  {unitAddress: 'E6',  attr: 'device_code'},
  {unitAddress: 'F6',  attr: 'safety_valve_code'},
  {unitAddress: 'G6',  attr: 'nominal_diameter'},
  {unitAddress: 'I6',  attr: 'install_location'},
  {unitAddress: 'J6',  attr: 'working_medium'},
  {unitAddress: 'L6',  attr: 'working_pressure'},
  {unitAddress: 'M6',  attr: 'rset_pressure'},
  {unitAddress: 'N6',  attr: 'task_num'},
];

// 测试数据
var param1 =
  {
    id_with_prefix: '2017-087078',
    company_name: '张家港',
    addr: '上海',
    contact_person: '马先生',
    contact_number: '18252035656',

    id: '0871122',
    device_name: '安全d',
    device_code: 'sdsaaSSAA',
    safety_valve_code: 'A121XXX-aas',
    nominal_diameter: '40',
    install_location: '上部',
    working_medium: '油',
    working_pressure: 0.72,
    rset_pressure: 0.80,
    task_num: 12,
  };


module.exports =  function exportTestRecord(param){
  var filenameIn = setting.applyTemplatePath;
  var outPath = setting.applyOutPath;
  var filenameOut = path.join(outPath, param.id+setting.applyFilename);

  var workbook = new Excel.Workbook();
  workbook.xlsx.readFile(filenameIn)
  .then(function() {
    var options = {
      useSharedStrings: true,
      useStyles: true
    };
    // 创建输出目录
    setting.mkdirsSync(outPath);

    console.log(filenameIn);
    console.log(filenameOut);

    // 拼接编号前缀
    param.id_with_prefix = new Date(param.accept_date).getFullYear() +'-'+ param.id;

    // 遍历两张表，一张为校验站留存，一张为客户取阀凭证
    workbook.eachSheet(function(worksheet, sheetId) {
      // 替换Excel模板中的值
      for( var i=0; i<excelTemplate.length; ++i) {
        console.log(excelTemplate[i].attr, param[ excelTemplate[i].attr ]);
        worksheet.getCell( excelTemplate[i].unitAddress ).value = param[ excelTemplate[i].attr ] ;
      }
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
}
