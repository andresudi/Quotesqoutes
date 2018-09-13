const jwt = require('jsonwebtoken')
const User = require('../models/user')

const isLogin = (req, res, next) => {
    var token = req.headers.token
     if (token) {
        var decode = jwt.verify(token, process.env.jwt_secret)
        User.findOne({
            email: decode.email 
        })
        .then((data) => {
            if (data) {
                req.loggedInUser = data
                next()
            } else {
                res.status(400).json({
                    message: 'User is not Authenticated'
                })
            } 
        })
        .catch((err) => {
            res.status(400).json({
                message: err.message
            })
        })
    } else {
        res.status(400).json({
            message: 'no token'
        })
    }
}

module.exports = isLogin 