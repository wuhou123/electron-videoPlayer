const fs = require('fs')
const path = require('path')
exports.readFile = function (fileName) {
  const filePath = path.join(__static, `./files/${fileName}`)
  return fs.readFileSync(filePath, {encoding: 'utf-8'})
}

exports.writeFile = function (fileName, content) {
  const filePath = path.join(__static, `./files/${fileName}`)
  return fs.writeFileSync(filePath, content)
}