const express = require('express')
const router = express.Router()
const Category = require('../../models/category.js')
const Record = require('../../models/record.js')

let recordList = []

router.get('/', (req, res) => {
  let totalAmount = 0
  Record.find()
    .lean()
    .then((records) => {
      records.forEach((record) => {
        totalAmount += record.amount
        const date = new Date(record.date)
        const year = date.getFullYear()
        const month = date.getMonth() + 1
        const day = date.getDate()
        record.date = `${year}/${month}/${day}`
      })
      recordList = records
    })
    .catch((error) => console.log(error))

  Category.find()
    .lean()
    .then((categories) =>
      res.render('index', { recordList, totalAmount, categories })
    )
    .catch((error) => console.log(error))
})

module.exports = router
