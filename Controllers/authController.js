const bcrypt = require('bcryptjs')
const UserModel = require('../Models/User')

const createJwtToken = id => {
    const maxAge = 1 * 24 * 60 * 60;
    return jwt.sign(id, accessTokenSecret, {
        expiresIn: maxAge
    });
}

module.exports.register = async(req, res) => {
    try {
        const { data } = req.body;
        const user = await UserModel.create(data)
        const token = createJwtToken({ userId: user._id, isAdmin: user.isAdmin })
        res.status(201).json(token);
    } catch (err) {
        res.status(500).json(err)
    }
}

module.exports.login = async(req, res) => {
    try {
        const { username, password } = req.body
        if (!(username && password)) {
            res.status(400).json({ message: "all fields required" });
        }
        const user = await UserModel.findOne({ username });
        if (user) {
            bcrypt.compare(password, user.password, async = (err, result) => {
                // result == true
                if (!result) {
                    res.status(400).json({ message: "username or password is wrong" });
                } else {
                    const token = createJwtToken({ userId: user._id, isAdmin: user.isAdmin })
                    res.status(200).json(token);
                }
            })
        } else {
            res.status(400).json({ message: "User not found" });
        }
    } catch (err) {
        res.status(500).json(err)
    }
}