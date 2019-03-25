const express = require('express')
const router = express.Router()
const Product = require('../models/product')

router.get('/', function (req, res) {
  Product.find()
    .then(function (products) {
      if (products.length > 0) {
        res.status(200).json(products)
      }else {
        res.status(404).json({message: 'No product found'})
      }
    })
    .catch(function (error) {
      res.status(500).json(error)
    })
})

// http post 201 status
router.post('/', function (req, res) {
  const product = new Product({
    name: req.body.name,
    price: req.body.price
  })

  product.save().then(function (result) {
    console.log(result)
    res.status(201).json({
      message: 'this is a post request for /products',
      product: result
    })
  }).catch(function (error) {
    console.log(error)
    res.status(500).json({error: 'Something went wrong while saving the product'})
  })
})

router.get('/:productId', function (req, res) {
  const id = req.params.productId
  Product.findById(id)
    .then(function (product) {
      console.log(product)
      if (product)
        res.status(200).json(product)
      else
        res.status(404).json({message: 'product does not exist'})
    })
    .catch(function (error) {
      console.log(error)
      res.status(500).json(error)
    })
})

router.patch('/:productId', function (req, res) {
  const id = req.params.productId

  const updateOps = {}

  for (const ops of req.body) {
    updateOps[ops.propName] = ops.value
  }

  // first value to find the item second value to desc how to update
  Product.update({_id: id}, {$set: updateOps})
    .then(function (updatedProduct) {
      res.status(200).json(updatedProduct)
    })
    .catch(function (error) {
      res.status(500).json(error)
    })
})

router.delete('/:productId', function (req, res) {
  const id = req.params.productId
  Product.remove({_id: id})
    .then(function (result) {
      console.log(result)
      res.status(200).json(result)
    })
    .catch(function (error) {
      res.status(500).json(error)
    })
})

module.exports = router
