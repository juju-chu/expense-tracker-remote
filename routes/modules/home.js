const express = require('express')
const router = express.Router()
const Category = require('../../models/category.js')
const Record = require('../../models/record.js')
router.get('/', (req, res) => {
  Record.find()
    .lean()
    .sort({ _id: 'asc' })
    .then((records) => {
      let totalAmount = 0
      records.forEach((record) => {
        totalAmount += record.amount
        record.date = new Date(record.date).toISOString().slice(0, 10)
      })
      return { records, totalAmount }
    })
    .then(({ records, totalAmount }) => {
      Category.find()
        .lean()
        .sort({ _id: 'asc' })
        .then((categories) =>
          res.render('index', { recordList: records, totalAmount, categories })
        )
        .catch((error) => console.log(error))
    })
    .catch((error) => console.log(error))
})

module.exports = router
