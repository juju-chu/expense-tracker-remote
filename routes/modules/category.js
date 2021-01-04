const express = require('express')
const router = express.Router()
const Category = require('../../models/category.js')
const Record = require('../../models/record.js')

let recordList = []

router.post('/', (req, res) => {
  const categorySelected = req.body.category

  let totalAmount = 0
  let recordList = []
  let year = ''
  let month = ''
  let day = ''

  Record.find({ category: categorySelected })
    .lean()
    .sort({ _id: 'asc' })
    .then((record) => {
      recordList = record
    })
    .then(() => {
      recordList.forEach((record) => {
        totalAmount += record.amount
        const date = new Date(record.date)
        year = date.getFullYear()
        month = date.getMonth() + 1
        day = date.getDate()
        if (month < 10) {
          month = '0' + month
        }
        day = date.getDate()
        if (day < 10) {
          day = '0' + day
        }
        record.date = `${year}-${month}-${day}`
      })
    })
    .then(() => {
      Category.find()
        .lean()
        .sort({ _id: 'asc' })
        .then((categories) =>
          res.render('category', {
            recordList,
            totalAmount,
            categories,
            categorySelected,
          })
        )
        .catch((error) => console.log(error))
    })
    .catch((error) => console.log(error))
})

module.exports = router
