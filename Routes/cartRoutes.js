const express = require('express')
const router = express.Router()
const { verifyToken } = require('../middleware/auth')
const cartController = require('../Controllers/cartController')

router.post('/', verifyToken, cartController.createCart)
router.put('/:id', verifyToken, cartController.updateCart)
router.delete('/:id', verifyToken, cartController.deleteCart)
router.get('/find/:userId', verifyToken, cartController.getCartByUserId)
router.get('/', verifyToken, cartController.getAllCart)

module.exports = router