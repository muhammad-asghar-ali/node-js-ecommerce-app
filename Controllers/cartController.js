const Cart = require('../Models/Cart')

module.exports.createCart = async(req, res) => {
    try {
        const { data } = req.body
        const { isAdmin, userId } = res.locals.userInfo
        if (userId === id || isAdmin) {
            const productCart = await Cart.create(data)
            res.status(201).json(productCart)

        } else {
            res.status(403).json({ message: "you are not allowed." })
        }
    } catch (err) {
        res.status(500).json(err.message)
    }
}

module.exports.updateCart = async(req, res) => {
    try {
        const { id } = req.params
        const { data } = req.body
        const { isAdmin } = res.locals.userInfo
        if (isAdmin) {
            const productCart = await Cart.findByIdAndUpdate(id, { $set: data }, { new: true })
            res.status(200).json(productCart)

        } else {
            res.status(403).json({ message: "you are not allowed." })
        }
    } catch (err) {
        res.status(500).json(err.message)
    }
}

module.exports.deleteCart = async(req, res) => {
    try {
        const { id } = req.params
        const { isAdmin } = res.locals.userInfo
        if (isAdmin) {
            await Cart.findByIdAndDelete(id)
            res.status(200).json({ message: "cart deleted" })

        } else {
            res.status(403).json({ message: "you are not allowed." })
        }
    } catch (err) {
        res.status(500).json(err.message)
    }
}

module.exports.getCartByUserId = async(req, res) => {
    try {
        const { userId } = req.params
        const cart = await Cart.findOne({ userId: userId })
        res.status(200).json(cart)
    } catch (err) {
        res.status(500).json(err.message)
    }
}

module.exports.getAllCart = async(req, res) => {
    try {
        const { isAdmin } = res.locals.userInfo
        if (isAdmin) {
            const carts = await Cart.find()
            res.status(200).json(carts)

        } else {
            res.status(403).json({ message: "you are not allowed." })
        }
    } catch (err) {
        res.status(500).json(err.message)
    }
}