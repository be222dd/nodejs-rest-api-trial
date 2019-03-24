const express = require('express')
const app = express()
const morgan = require('morgan')
const bodyParser = require('body-parser')
const productRoutes = require('./api/routes/products')
const orderRoutes = require('./api/routes/orders')

app.use(morgan('dev'))
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

// CORS header setup
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Constent-Type, Accept, Authorization')
  // TO SAY the browser with methods we support bcz some browsers sends a option req first
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'PUT, PATCH, DELETE, GET, POST')
    return res.status(200).json({})
  }
  next()
})

app.use('/products', productRoutes)
app.use('/orders', orderRoutes)

// error handler custom 404 error
app.use(function (req, res, next) {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})

// any other error thrown
app.use(function (error, req, res, next) {
  res.status(error.status || 500)
  res.json({
    error: {
      message: error.message
    }
  })
})

module.exports = app
