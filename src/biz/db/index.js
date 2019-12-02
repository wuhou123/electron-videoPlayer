const low = require('lowdb')
const path = require('path')
const FileSync = require('lowdb/adapters/FileSync')

const filePath = path.join(__static, 'db', 'db.json')
const adapter = new FileSync(filePath)

let db = null

function initialize () {
  db = low(adapter)
  db.defaults({ posts: [], user: {}, count: 0 }).write()
  return db
}

function getDb () {
  if (!db) {
    initialize()
  }
  return db
}

exports.getDb = getDb