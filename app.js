const express = require('express')
const exphbs = require('express-handlebars')

require('./config/mongoose.js')
const routes = require('./routes') // './routes/index.js'

const app = express()
const PORT = process.env.PORT || 3000

app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')
app.use(routes)

app.listen(PORT, () => {
  console.log(`App is running on http://localhost/${PORT}`)
})
