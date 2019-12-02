const xlsx = require('xlsx');

function readExcel (filename) {
  xlsx.readFile(filename)
}

exports.readExcel = readExcel