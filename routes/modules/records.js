const express = require('express')
const router = express.Router()
const Category = require('../../models/category.js')
const Record = require('../../models/record.js')

router.get('/new', (req, res) => {
  Category.find()
    .lean()
    .then((categories) => res.render('new', { categories }))
    .catch((error) => console.log(error))
})

router.post('/', (req, res) => {
  Category.find()
    .lean()
    .then((categories) => {
      const targetCategory = categories.find(
        (category) => category.name === req.body.category
      )
      categories.forEach((category) => {
        if (category.name === targetCategory.name) {
          req.body.categoryIcon = category.icon
        }
      })
    })
    .then(() => {
      return Record.create(req.body)
        .then(() => res.redirect('/'))
        .catch((error) => console.log(error))
    })
    .catch((error) => console.log(error))
})

module.exports = router
