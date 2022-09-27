const express = require('express')
const router = express.router()
const authController = require('../Controllers/authController')

// register
router.post('/register', authController.register)

// login
router.post('/user', authController.login)

module.exports = router