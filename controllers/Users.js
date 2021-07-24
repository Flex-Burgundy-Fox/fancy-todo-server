const { comparePassword, generateToken } = require("../helper")
const {User} = require("../models")

class UserController {
    static registers(req, res, next) {
        const {email, password} = req.body
        User.create({email, password})
        .then((user) => {
            res.status(201).json({
                id: user.id,
                email : user.email
            })
        })
        .catch((err) => {
            next(err)
        })
    }

    static login(req, res) {
        const {email, password} = req.body
        User.findOne({
            where: {email}
        })
        .then((user) => {
            const validatePass = comparePassword(password, user.password)
            if (!user) {
                throw ({name : "Login Failed"})
            }
            if(validatePass) {
                const token = generateToken({
                    id: user.id,
                    email: user.email
                })
                res.status(200).json({
                    access_token: token
                })
            } else {
                throw ({name : "Login Failed"})
            }
        })
        .catch((err) => {
            next(err)
        })
    }

}

module.exports = UserController