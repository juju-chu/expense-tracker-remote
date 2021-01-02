const express = require('express')
const hbs = require('handlebars')
const router = express.Router()
const Category = require('../../models/category.js')
const Record = require('../../models/record.js')

hbs.registerHelper('compare', function (item1, item2, options) {
  if (item1 === item2) {
    return options.fn(this)
  }
  return options.inverse(this)
})

router.get('/new', (req, res) => {
  Category.find()
    .lean()
    .then((categories) => res.render('new', { categories }))
    .catch((error) => console.log(error))
})

router.get('/:id/edit', (req, res) => {
  const id = req.params.id
  let categoryList = []
  let recordEdited = []
  let recordCategory = ''
  let year = ''
  let month = ''
  let day = ''

  Category.find()
    .lean()
    .then((categories) => (categoryList = categories))
    .catch((error) => console.log(error))

  return Record.findById(id)
    .lean()
    .then((record) => {
      recordEdited = record
    })
    .then(() => (recordCategory = recordEdited.category))
    .then(() => {
      const date = new Date(recordEdited.date)
      year = date.getFullYear()
      month = date.getMonth() + 1
      if (month < 10) {
        month = '0' + month
      }
      day = date.getDate()
      if (day < 10) {
        day = '0' + day
      }
    })
    .then(() => {
      recordEdited.date = `${year}-${month}-${day}`
    })
    .then(() =>
      res.render('edit', { recordEdited, recordCategory, categoryList })
    )
    .catch((error) => console.log(error))
})

router.post('/', (req, res) => {
  console.log(req.body.date)
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

router.put('/:id', (req, res) => {
  const id = req.params.id
  let targetCategory = ''
  let categoryList = []

  Category.find()
    .lean()
    .then((categories) => {
      categoryList = categories
    })
    .then(() => {
      targetCategory = categoryList.find(
        (category) => category.name === req.body.category
      )
    })
    .then(() => {
      categoryList.forEach((category) => {
        if (category.name === targetCategory.name) {
          req.body.categoryIcon = category.icon
        }
      })
    })
    .catch((error) => console.log(error))

  return Record.findById(id)
    .then((record) => {
      record = Object.assign(record, req.body)
      return record.save()
    })
    .then(() => res.redirect('/'))
    .catch((error) => console.log(error))
})

module.exports = router
