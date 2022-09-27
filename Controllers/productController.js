const Product = require("../Models/Product")

module.exports.createProduct = async(req, res) => {
    try {
        const { data } = req.body
        const { isAdmin, userId } = res.locals.userInfo
        if (userId === id || isAdmin) {
            const product = await Product.create(data)
            res.status(201).json(product)

        } else {
            res.status(403).json({ message: "you are not allowed." })
        }
    } catch (err) {
        res.status(500).json(err.message)
    }
}

module.exports.updateProduct = async(req, res) => {
    try {
        const { id } = req.params
        const { data } = req.body
        const { isAdmin } = res.locals.userInfo
        if (isAdmin) {
            const product = await Product.findByIdAndUpdate(id, { $set: data }, { new: true })
            res.status(200).json(product)

        } else {
            res.status(403).json({ message: "you are not allowed." })
        }
    } catch (err) {
        res.status(500).json(err.message)
    }
}

module.exports.getProduct = async(req, res) => {
    try {
        const { id } = req.params
        const product = await Product.findById(id)
        res.status(200).json(product)
    } catch (err) {
        res.status(500).json(err.message)
    }
}

module.exports.deleteProduct = async(req, res) => {
    try {
        const { id } = req.params
        const { isAdmin } = res.locals.userInfo
        if (isAdmin) {
            await Product.findByIdAndDelete(id)
            res.status(200).json({ message: "moive deleted" })

        } else {
            res.status(403).json({ message: "you are not allowed." })
        }
    } catch (err) {
        res.status(500).json(err.message)
    }
}

module.exports.getRandomProduct = async(req, res) => {
    try {
        const qNew = req.query.new
        const qCategory = req.query.category
        let product
        if (qNew) {
            product = await Product.find().sort({ createdAt: -1 }).limit(5)
        } else if (qCategory) {
            product = await Product.find({ categories: { $in: [qCategory] } })
        } else {
            product = await Product.find()
        }
        res.status(200).json(product)
    } catch (err) {
        res.status(500).json(err.message)
    }
}