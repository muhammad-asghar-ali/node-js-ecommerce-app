const jwt = require("jsonwebtoken")

module.exports.verifyToken = async(req, res, next) => {
    try {
        const authHeader = req.headers.authorization
        if (authHeader) {
            const token = authHeader.split(" ")[1]
            if (token) {
                jwt.verify(token, process.env.SECERTKEY, (err, user) => {
                    if (err) res.status(401).json("You are not authorized")
                    res.locals.userInfo = user
                    next();
                })
            } else {
                res.status(401).json("You are not authenicated")
            }
        }
    } catch (err) {
        res.status(500).json(err)
    }
}

module.exports.verifyTokenAndAuthorization = async(req, res, next) => {
    try {
        verifyToken(req, res, () => {
            // const { id } = req.params
            // const { userId, isAdmin } = res.locals.userInfo
            if (res.locals.userInfo.userId === req.params.id || res.locals.userInfo.isAdmin) {
                next()
            }
        })
    } catch (err) {
        res.status(500).json(err)
    }
}

module.exports.verifyTokenAndAdmin = async(req, res, next) => {
    try {
        verifyToken(req, res, () => {
            // const { id } = req.params
            // const { userId, isAdmin } = res.locals.userInfo
            if (res.locals.userInfo.isAdmin) {
                next()
            }
        })
    } catch (err) {
        res.status(500).json(err)
    }
}