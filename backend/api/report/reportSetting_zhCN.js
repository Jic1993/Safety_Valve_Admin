/*
  reportSetting_zhCN 生成报告的相关配置
*/

var fs = require('fs');
var path = require('path');

function padding(s) {
  return s < 10 ? '0' + s : s;
}
function getNowDate(date) {
  return date.getFullYear()+'年'+padding(date.getMonth()+1)+'月'+padding(date.getDate())+'日';
}


// NOTE: 校验报告的生成时间  暂时  定义为： exportTestReport.js 的首次调用时间


module.exports = {
  // 电子签名图片路径
  elecSigPath: path.join(__dirname, 'template'),

  // 校验委托单文件名后缀 （采用委托单编号 + 单位名称 + 此后缀的方式命名）
  applyFilename: '校验委托单.xlsx',
  // 校验委托单模板
  applyTemplatePath: path.join(__dirname, 'template/校验委托单.xlsx'),
  // 校验委托单输出路径，不包括报告的文件名
  applyOutPath: path.join(__dirname, 'excel1/校验委托单/', getNowDate(new Date())),


  // 校验报告文件名后缀 （采用校验编号+此后缀的方式命名）
  reportFilename: '校验报告.xlsx',
  // 校验报告模板
  reportTemplatePath: path.join(__dirname, 'template/校验报告.xlsx'),
  // 校验报告输出路径，不包括报告的文件名
  reportOutPath: path.join(__dirname, 'excel1/校验报告/', getNowDate(new Date())),

  // 校验记录文件名后缀 （采用校验编号+此后缀的方式命名）
  recordFilename: '校验记录.xlsx',
  // 校验记录模板
  recordTemplatePath: path.join(__dirname, 'template/校验记录.xlsx'),
  // 校验记录输出路径，不包括报告的文件名
  recordOutPath: path.join(__dirname, 'excel1/校验记录/', getNowDate(new Date())),

  // 校验台帐文件名后缀 （采用年份+此后缀的方式命名）
  bookFilename: new Date().getFullYear()+'校验台帐.xlsx',
  // 校验台帐模板
  bookTemplatePath: path.join(__dirname, 'template/校验台帐.xlsx'),
  // 校验台帐输出路径，不包括报告的文件名
  bookOutPath: path.join(__dirname, 'excel1/校验台帐'),

  getNowDate: function (date) {
      return date.getFullYear()+'年'+padding(date.getMonth()+1)+'月'+padding(date.getDate())+'日';
  },
  // 同步创建文件夹
  mkdirsSync: function (dirpath) {
    if(!fs.existsSync(dirpath)) {
      //递归调用自身创建父目录，然后再创建当前目录
      this.mkdirsSync(path.dirname(dirpath));
      fs.mkdirSync(dirpath);
    }
  }

}
