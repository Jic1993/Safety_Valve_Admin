/*
  genTestRecord

  生成校验记录EXCEL
*/

var fs = require('fs');
var path = require('path');
var Excel = require('exceljs');
var setting = require('./reportSetting_en');

var excelTemplate = [
  {unitAddress: 'L1',  attr: 'test_id_with_prefix'},
  {unitAddress: 'E3',  attr: 'company_name'},
  {unitAddress: 'E4',  attr: 'device_code'},
  {unitAddress: 'E5',  attr: 'working_medium'},
  {unitAddress: 'E6',  attr: 'nominal_diameter'},
  {unitAddress: 'E7',  attr: 'manufacture_company'},
  {unitAddress: 'E8',  attr: 'manufacture_license_number'},
  {unitAddress: 'E9',  attr: 'device_number'},
  {unitAddress: 'E10', attr: 'test_method'},
  {unitAddress: 'E11', attr: 'test_medium'},
  {unitAddress: 'E12', attr: 'safety_valve_type'},
  {unitAddress: 'L4',  attr: 'rset_pressure'},
  {unitAddress: 'L5',  attr: 'safety_valve_code'},
  {unitAddress: 'L6',  attr: 'seat_diameter'},
  {unitAddress: 'L8',  attr: 'pressure_range'},
  {unitAddress: 'L9',  attr: 'formated_manufacture_date'},
  {unitAddress: 'L10', attr: 'test_id'},
  {unitAddress: 'L11', attr: 'test_medium_temp'},

  {unitAddress: 'E17', attr: 'set_pressure1'},
  {unitAddress: 'H17', attr: 'set_pressure2'},
  {unitAddress: 'K17', attr: 'set_pressure3'},
  {unitAddress: 'M17', attr: 'set_pressure'},

  {unitAddress: 'E18', attr: 'seal_test_pressure1'},
  {unitAddress: 'H18', attr: 'seal_test_pressure2'},
  {unitAddress: 'K18', attr: 'seal_test_pressure3'},
  {unitAddress: 'M18', attr: 'seal_test_pressure'},

  {unitAddress: 'E19', attr: 'test_result'},
  {unitAddress: 'L19', attr: 'formated_next_test_date'},
  {unitAddress: 'C21', attr: 'maintenance_situation'},

  // {unitAddress: 'C26', attr: 'tester_name'},
  // {unitAddress: 'J26', attr: 'reviewer_name'},
  {unitAddress: 'M26', attr: 'formated_review_date'},
];

var param1 =
  {
    test_id_with_prefix: 'ZJG-AF-2017-087078',
    test_id: '087078',
    company_name: '张家港',
    contact_person: '马先生',
    safety_valve_type: '弹簧式',
    rset_pressure: 0.80,
    test_method: '校验装置',
    set_pressure: 0.80,
    test_result: '合格',
    working_medium: '油',
    test_medium: '空气',
    seal_test_pressure: 0.72,
    maintenance_situation: '无',
    review_date: '2017年07月24日',
    next_test_date: '2018年09月21日',
    tester_name: '小路',
    reviewer_name: '小路',
  };


module.exports =  function exportTestRecord(param){

  var filenameIn  = setting.recordTemplatePath;
  var outPath     = setting.recordOutPath;
  var filenameOut = path.join(outPath, param.test_id+setting.recordFilename);

  var workbook = new Excel.Workbook();
  workbook.xlsx.readFile(filenameIn)
  .then(function() {
    var options = {
      // useSharedStrings: true,
      // useStyles: true
    };
    // 创建输出目录
    setting.mkdirsSync(outPath);

    console.log(filenameOut);

    // fetch sheet by id
    var worksheet   = workbook.getWorksheet(1);
    // var testerImg   = path.join(setting.elecSigPath, param.tester_name+'.png');
    // var reviewerImg = path.join(setting.elecSigPath, param.reviewer_name+'.png');

    // For Linux System
    var testerImg   = path.join(setting.elecSigPath, encodeURI(param.tester_name)+'.png');
    var reviewerImg = path.join(setting.elecSigPath, encodeURI(param.reviewer_name)+'.png');

    // add image1 to workbook by filename
    var imageId1 = workbook.addImage({
      filename: testerImg,
      extension: 'png',
    });
    // insert an image over part of D19:E19
    worksheet.addImage(imageId1, {
      tl: { col: 2.9, row: 25.1 },
      br: { col: 5.9, row: 26 }
    });
    // add image2 to workbook
    var imageId2 = workbook.addImage({
      filename: reviewerImg,
      extension: 'png',
    });
    worksheet.addImage(imageId2, {
      tl: { col: 9.2, row: 25.1 },
      br: { col: 11.6, row: 26 }
    });

    var prefix = (JSON.parse(param.setting||'0').rid_prefix)||'';
    param.test_id_with_prefix = prefix+param.test_id;

    // 替换Excel模板中的值
    for( var i=0; i<excelTemplate.length; ++i) {
      console.log(excelTemplate[i].attr, param[ excelTemplate[i].attr ]);
      worksheet.getCell( excelTemplate[i].unitAddress ).value = param[ excelTemplate[i].attr ] ;
    }

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
