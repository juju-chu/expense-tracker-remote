const mongoose = require('mongoose')
const Schema = mongoose.Schema
const recordSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Why no name?'],
  },
  date: {
    type: Date,
    default: Date.now,
  },
  category: {
    type: String,
    required: [true, '請選擇一個類別'],
  },
  amount: {
    type: Number,
    required: true,
  },
})
module.exports = mongoose.model('Record', recordSchema)
