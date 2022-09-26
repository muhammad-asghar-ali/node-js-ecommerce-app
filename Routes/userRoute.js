const express = require('express')
const router = express.Router()
const userController = require('../Controllers/userController')


// update user
router.put('/:id', verifyToken, userController.updateUser)

// delete user
router.delete('/:id', verifyToken, userController.deleteUser)

// get user
router.get('/find/:id', verifyToken, userController.getUser)

// get all users
router.get('/', verifyToken, userController.getAllUsers)

// get stat
router.get('/stats', userController.getStat)

module.exports = router