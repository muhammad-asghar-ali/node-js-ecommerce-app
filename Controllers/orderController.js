const Order = require('../Models/Order')

module.exports.addOrder = async(req, res) => {
    try {
        const { data } = req.body
        const { isAdmin, userId } = res.locals.userInfo
        if (userId === id || isAdmin) {
            const productOrder = await Order.create(data)
            res.status(201).json(productOrder)

        } else {
            res.status(403).json({ message: "you are not allowed." })
        }
    } catch (err) {
        res.status(500).json(err.message)
    }
}

module.exports.updateOrder = async(req, res) => {
    try {
        const { id } = req.params
        const { data } = req.body
        const { isAdmin } = res.locals.userInfo
        if (isAdmin) {
            const productOrder = await Order.findByIdAndUpdate(id, { $set: data }, { new: true })
            res.status(200).json(productOrder)

        } else {
            res.status(403).json({ message: "you are not allowed." })
        }
    } catch (err) {
        res.status(500).json(err.message)
    }
}

module.exports.deleteOrder = async(req, res) => {
    try {
        const { id } = req.params
        const { isAdmin } = res.locals.userInfo
        if (isAdmin) {
            await Order.findByIdAndDelete(id)
            res.status(200).json({ message: "order removed" })

        } else {
            res.status(403).json({ message: "you are not allowed." })
        }
    } catch (err) {
        res.status(500).json(err.message)
    }
}

module.exports.getOrderByUser = async(req, res) => {
    try {
        const { userId } = req.params
        const orders = await Order.find({ userId: userId })
        res.status(200).json(orders)
    } catch (err) {
        res.status(500).json(err.message)
    }
}

module.exports.getAllOrders = async(req, res) => {
    try {
        const { isAdmin } = res.locals.userInfo
        if (isAdmin) {
            const orders = await Order.find()
            res.status(200).json(orders)

        } else {
            res.status(403).json({ message: "you are not allowed." })
        }
    } catch (err) {
        res.status(500).json(err.message)
    }
}

module.exports.getStat = async(req, res) => {
    try {
        const today = new Date()
        const lastMonth = new Date(today.setMonth(today.setMonth() - 1))
        const previousMonth = new Date(new Date().setMonth(lastMonth.setMonth() - 1))

        // const monthArray = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        const data = await Order.aggregate([
            { $match: { $createdAt: { $gte: previousMonth } } },
            {
                $project: {
                    month: { $month: "$createdAt" },
                    sales: "$amount"
                }
            }, {
                $group: {
                    _id: '$month',
                    total: { $sum: "$sales" }
                }
            }
        ])
        res.status(200).json(data)
    } catch (err) {
        res.status(500).json(err.message)
    }
}