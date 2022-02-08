const express = require('express')
const app = express()

const morgan = require('morgan')

// open the connection to the db
// if you require a directory -> index.js is executed
require('./db')

const port = 3000

app.set('view engine', 'hbs')

// logger - to get more info in the terminal
app.use(morgan('dev'))

// to access the request body
app.use(express.urlencoded({ extended: false }));


// import all routes
const bookRoutes = require('./routes/books')
app.use('/', bookRoutes)


// error handling
const errorHandler = require('./error-handling')
errorHandler(app)

app.listen(port, () => {
	console.log(`Server listening on http://localhost:${port}`)
})