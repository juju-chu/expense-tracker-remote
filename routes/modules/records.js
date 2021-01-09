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

router.get('/:id/edit', (req, res) => {
  const id = req.params.id
  Category.find()
    .lean()
    .then((categories) => {
      Record.findById(id)
        .lean()
        .then((record) => {
          const recordCategory = record.category
          record.date = new Date(record.date).toISOString().slice(0, 10)
          return { record, recordCategory }
        })
        .then(({ record, recordCategory }) =>
          res.render('edit', {
            recordEdited: record,
            recordCategory,
            categoryList: categories,
          })
        )
        .catch((error) => console.log(error))
    })
    .catch((error) => console.log(error))
})

router.post('/', (req, res) => {
  Record.create(req.body)
    .then(() => res.redirect('/'))
    .catch((error) => console.log(error))
})

router.put('/:id', (req, res) => {
  const id = req.params.id
  Record.findById(id)
    .then((record) => {
      record = Object.assign(record, req.body)
      return record.save()
    })
    .then(() => res.redirect('/'))
    .catch((error) => console.log(error))
})

router.delete('/:id', (req, res) => {
  const id = req.params.id
  return Record.findById(id)
    .then((record) => record.remove())
    .then(() => res.redirect('/'))
    .catch((error) => console.log(error))
})

module.exports = router
