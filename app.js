const express = require('express')
const bodyParser = require('body-parser')


const app = express()
const port = process.env.PORT || 8000

// Static Files
app.use(express.static('public'))

// Templating Engine
app.set('views', './src/views')
app.set('view engine', 'ejs')

// Parsing middleware
// Parse application/x-www-form-urlencoded
// app.use(bodyParser.urlencoded({ extended: false })); // Deprecated
app.use(express.urlencoded({extended: true})); // New


// Routes
const report1Router = require('./src/routes/report1')
const { env } = require('process')

app.use('/', report1Router)
app.use('/article', report1Router)

// Listen on port 5000
app.listen(port, () => console.log(`Listening on port ${port}`))



  