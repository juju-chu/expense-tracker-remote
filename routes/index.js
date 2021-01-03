const express = require('express')
const hbs = require('handlebars')
const home = require('./modules/home.js')
const records = require('./modules/records.js')
const category = require('./modules/category.js')

const router = express.Router()

hbs.registerHelper('compare', function (item1, item2, options) {
  if (item1 === item2) {
    return options.fn(this)
  }
  return options.inverse(this)
})

router.use('/', home)
router.use('/records', records)
router.use('/category', category)

module.exports = router
