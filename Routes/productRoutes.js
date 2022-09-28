const express = require("express")
const productContoller = require('../Controllers/productController')
const router = express.Router()
const { verifyToken } = require('../middleware/auth')

// add products
router.post('/', verifyToken, productContoller.createProduct)

// update product
router.put('/:id', verifyToken, productContoller.updateProduct)

// delete product
router.delete('/:id', verifyToken, productContoller.deleteProduct)

// get product
router.get('/find/:id', verifyToken, productContoller.getProduct)

// get Random product 
router.get('/', verifyToken, productContoller.getRandomProduct)

module.exports = router