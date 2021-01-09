const express = require('express')
const router = express.Router()
const Category = require('../../models/category.js')
const Record = require('../../models/record.js')
router.get('/', (req, res) => {
  Category.find()
    .lean()
    .sort({ _id: 'asc' })
    .then((categories) => {
      Record.find()
        .lean()
        .sort({ _id: 'asc' })
        .then((records) => {
          let totalAmount = 0
          records.forEach((record) => {
            totalAmount += record.amount
            record.date = new Date(record.date).toISOString().slice(0, 10)
            const categoryIndex = categories.findIndex(
              (category) => category.name === record.category
            )
            record.categoryIcon = categories[categoryIndex].icon
          })
          return { records, totalAmount }
        })
        .then(({ records, totalAmount }) => {
          res.render('index', { recordList: records, totalAmount, categories })
        })
        .catch((error) => console.log(error))
    })
    .catch((error) => console.log(error))
})

module.exports = router
