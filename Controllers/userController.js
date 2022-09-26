const UserModel = require('../Models/User')

module.exports.updateUser = async(req, res) => {
    try {
        const { id } = req.params
        const { userId, isAdmin } = res.locals.userInfo
        const data = req.body

        if (userId === id || isAdmin) {
            if (data.password) {
                data.password = CryptoJs.AES.encrypt(password, process.env.SECERTKEY).toString()
            }
            const updateUser = await UserModel.findByIdAndUpdate(id, { $set: data }, { new: true })
            res.status(200).json(updateUser)
        } else {
            res.status(403).json("you are only update your account")
        }
    } catch (err) {
        res.status(500).json(err)
    }
}

module.exports.deleteUser = async(req, res) => {
    try {
        const { id } = req.params
        const { userId, isAdmin } = res.locals.userInfo

        if (userId === id || isAdmin) {
            await UserModel.findByIdAndDelete({ _id: id })
            res.status(200).json("user deleted successfully")
        } else {
            res.status(403).json("you can only delete your account")
        }
    } catch (err) {
        res.status(500).json(err)
    }
}

module.exports.getUser = async(req, res) => {
    try {
        const { id } = req.params
        const { isAdmin } = res.locals.userInfo
        if (isAdmin) {
            const user = await UserModel.findById({ _id: id })
            const { password, ...info } = user._doc
            res.status(200).json(info)
        }

    } catch (err) {
        res.status(500).json(err)
    }
}

module.exports.getAllUsers = async(req, res) => {
    try {
        const query = req.query.new
        const { isAdmin } = res.locals.userInfo

        if (isAdmin) {
            const user = query ? await UserModel.find().sort({ _id: -1 }).limit(10) : await UserModel.find().lean()
            res.status(200).json(user)
        } else {
            res.status(403).json("you are not allowed to see all users")
        }
    } catch (err) {
        res.status(500).json(err)
    }
}

module.exports.getStat = async(req, res) => {
    try {
        const today = new Date()
        const lastYear = today.setFullYear(today.setFullYear() - 1)

        // const monthArray = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        const data = await UserModel.aggregate([
            { $match: { $createdAt: { $gte: lastYear } } },
            {
                $project: {
                    month: { $month: "$createdAt" }
                }
            }, {
                $group: {
                    _id: '$month',
                    total: { $sum: 1 }
                }
            }
        ])
        res.status(200).json(data)
    } catch (err) {
        res.status(500).json(err)
    }
}