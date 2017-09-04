/*
  genTestReport

  生成校验报告EXCEL
*/

var fs = require('fs');
var path = require('path');
var Excel = require('exceljs');
var setting = require('./reportSetting_en');


// var filenameIn  = path.join(__dirname, 'template/校验报告.xlsx');
// var filenameOut = path.join(__dirname, 'excel/outt.xlsx');
var unitAddress = ['I1','E3','E4','E5','E6','E7','E8','E9','E10','E11',
                   'E12','I5','I6','I7','I8','I9','I10','I11','C14','E15',
                   'I15','F16','F17','F19','J16','H19'];
var attr = ['test_id_with_prefix',
            'company_name',
            'addr',
            'contact_person',
            'device_code',
            'safety_valve_type',
            'working_pressure',
            'rset_pressure',
            'test_method',
            'set_pressure',
            'test_result',
            'contact_number',
            'install_location',
            'safety_valve_code',
            'working_medium',
            'implement_std',
            'test_medium',
            'seal_test_pressure',
            'maintenance_situation',
            'formated_test_date',
            'formated_next_test_date',
            'formated_test_date',
            'formated_review_date',
            'formated_issue_date',
            'approval_number',
            'formated_issue_date',
            // 'report_date',
            // 'tester_name',
            // 'reviewer_name',
            // 'issuer_name'
          ];

var param1 = {
  test_id: 'ZJG-AF-2017-087075',
  company_name: '张家港',
  addr: '西方',
  contact_person: '马先生',
  device_code: 'xxx',
  safety_valve_type: '弹簧式',
  working_pressure: '不明',
  rset_pressure: 0.80,
  test_method: '校验装置',
  set_pressure: 0.80,
  test_result: '合格',
  contact_number: '18254565656',
  install_location: '上部',
  safety_valve_code: 'A42Y-16C(DN32)',
  working_medium: '油',
  implement_std: 'TSGZF001-2006\nGB/T12242-2005',
  test_medium: '空气',
  seal_test_pressure: 0.72,
  maintenance_situation: '无',
  test_date: '2017年07月21日',
  next_test_date: '2018年07月21日',
  review_date: '2018年07月21日',
  issue_date: '2018年07月21日',
  approval_number: 'TS7110213-2019',
  report_date: '2018年07月21日',
  tester_name: 'name1',
  reviewer_name: 'name2',
  issuer_name: 'name3',
};


module.exports =  function exportTestReport(param){

  var filenameIn  = setting.reportTemplatePath;
  var outPath     = setting.reportOutPath;
  var filenameOut = path.join(outPath, param.test_id+setting.reportFilename);

  var workbook = new Excel.Workbook();
  workbook.xlsx.readFile(filenameIn)
  .then(function() {
    var options = {
    useSharedStrings: true,
    useStyles: true
    };
    // 创建校验报告的输出目录
    setting.mkdirsSync(outPath);

    console.log(filenameOut);

    // fetch sheet by id
    var worksheet = workbook.getWorksheet(1);

    // var testerImg   = path.join(setting.elecSigPath, param.tester_name+'.png');
    // var reviewerImg = path.join(setting.elecSigPath, param.reviewer_name+'.png');

    // For Linux System
    var testerImg   = path.join(setting.elecSigPath, encodeURI(param.tester_name)+'.png');
    var reviewerImg = path.join(setting.elecSigPath, encodeURI(param.reviewer_name)+'.png');
    var issuerImg   = path.join(setting.elecSigPath, encodeURI(param.issuer_name)+'.png');


    // add image1 to workbook by filename
    var imageId1 = workbook.addImage({
      filename: testerImg,
      extension: 'png',
    });
    // insert an image over part of D16:E16
    worksheet.addImage(imageId1, {
      tl: { col: 3.1, row: 15.1 },
      br: { col: 4.9, row: 16 }
    });
    // add image2 to workbook
    var imageId2 = workbook.addImage({
      filename: reviewerImg,
      extension: 'png',
    });
    worksheet.addImage(imageId2, {
      tl: { col: 3.1, row: 16.1 },
      br: { col: 4.9, row: 17.99 }
    });
    // add image3 to workbook
    var imageId3 = workbook.addImage({
      filename: issuerImg,
      extension: 'png',
    });
    worksheet.addImage(imageId3, {
      tl: { col: 3.1, row: 18.1 },
      br: { col: 4.9, row: 19 }
    });


    var prefix = (JSON.parse(param.setting||'0').rid_prefix)||'';
    param.test_id_with_prefix = prefix+param.test_id;

    // 替换Excel模板中的值
    for( var i=0; i<unitAddress.length; i++) {
      console.log(attr[i],param[attr[i]],'\n');
      worksheet.getCell(unitAddress[i]).value = param[attr[i]];
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
