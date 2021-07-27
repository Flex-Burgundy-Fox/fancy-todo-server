
const { comparePassword, generateToken } = require('../helpers/helpersIndex')
const { User } = require('../models')

class UserController {

    static registerUser (req, res, next) {
        let { email, password } = req.body
        User.create(
            {
                email,
                password
            }
        )
        .then((data) => {
            res.status(201).json({
                email: data.email
            })
        })
        .catch((err) => {
            next(err)
        })
    }

    static loginUser (req, res, next) {
        const { email, password } = req.body
        User.findOne({
            where: { email }
        })
        .then((userData) => {
            if (!userData) throw {error: 'Login Failed'}
            const isCorrect = comparePassword(password, userData.password)
            if (!isCorrect) {
                throw {
                    error: "Login Failed"
                }
            }
            const access_token = generateToken({
                id: userData.id
            })
            res.status(200).json({
                access_token
            })
        })
        .catch((err) => {
            next(err)
        })
    }

}


module.exports = UserController