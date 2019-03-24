const express = require('express')
const app = express()
const morgan = require('morgan')
const productRoutes = require('./api/routes/products')
const orderRoutes = require('./api/routes/orders')

app.use(morgan('dev'))
app.use('/products', productRoutes)
app.use('/orders', orderRoutes)

// error handler custom 404 error
app.use(function (req, res, next) {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})

//any other error thrown
app.use(function (error, req, res, next) {
  res.status(error.status || 500)
  res.json({
    error: {
      message: error.message
    }
  })
})

module.exports = app
