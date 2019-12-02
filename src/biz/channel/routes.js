const { PAYLOAD_TYPES } = require('./constants')
const xlsx = require('xlsx');
const path = require('path')

module.exports = {
  [PAYLOAD_TYPES.READ_EXCEL]: function ({payload, callback}) {
    // 在此做业务处理，payload为入参, callback为回调函数

    // do business...

    // invoke callback
    callback({
      data: '5555'
    })
  },
  [PAYLOAD_TYPES.READ_FIRST_EXCEL]: function ({payload, callback}) {
    const filename = path.join(__static, 'files/main.xls')
    const workbook = xlsx.readFile(filename)
    callback({
      workbook
    })
  },
}