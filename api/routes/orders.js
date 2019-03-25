const express = require('express')
const router = express.Router()

router.get('/', function (req, res) {
  res.status(200).json({
    message: 'this is a get request for /orders'
  })
})
router.get('/:orderId', function (req, res) {
  const id = req.params.orderId
  res.status(200).json({
    message: 'this is a get request for /orders/id',
    id: id
  })
})

// http post 201 status
router.post('/', function (req, res) {
  const order = {
    productId: req.body.productId,
    productQuantity: req.body.quantity
  }
  res.status(201).json({
    message: 'this is a post request for /orders/id',
    order: order
  })
})

router.delete('/:orderId', function (req, res) {
  const id = req.params.orderId
  res.status(200).json({
    message: 'this is a delete request for /orders/id',
    id: id
  })
})

module.exports = router
