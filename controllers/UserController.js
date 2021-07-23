const { comparePassword, generateToken } = require('../helpers/helpersIndex')
const { User } = require('../models')

class UserController {

    static registerUser (req, res) {
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
            res.status(400).json({
                error: 'Validation Error'
            })
        })
    }

    static loginUser (req, res) {
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
                id: userData.id,
                password: userData.password
            })
            res.status(200).json({
                token : access_token
            })
        })
        .catch((err) => {
            if (err.error === 'Login Failed') {
                res.status(400).json({
                    error: 'Wrong Email / Password!'
                })
            }
            res.status(500).json({
                error: 'Internal Server Error'
            })
        })
    }

}


module.exports = UserController