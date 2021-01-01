const express = require('express')

require('./config/mongoose.js')

const app = express()
const PORT = process.env.PORT || 3000

app.get('/', (req, res) => {})

app.listen(PORT, () => {
  console.log(`App is running on http://localhost/${PORT}`)
})
