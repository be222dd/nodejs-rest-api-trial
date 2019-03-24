const express = require('express')
const router = express.Router()

router.get('/', function (req, res) {
  res.status(200).json({
    message: 'this is a get request for /products'
  })
})

// http post 201 status
router.post('/', function (req, res) {
  const product = {
    name: req.body.name,
    price: req.body.price
  }
  res.status(201).json({
    message: 'this is a post request for /products',
    product: product
  })
})

router.get('/:productId', function (req, res) {
  const id = req.params.productId
  res.status(200).json({
    message: 'got the product ',
    id: id
  })
})

router.patch('/:productId', function (req, res) {
  const id = req.params.productId
  res.status(200).json({
    message: 'updated product ',
    id: id
  })
})

router.delete('/:productId', function (req, res) {
  const id = req.params.productId
  res.status(200).json({
    message: 'deleted product ',
    id: id
  })
})

module.exports = router
