
const { comparePassword, generateToken } = require('../helpers/helpersIndex')
const { User } = require('../models')
const {OAuth2Client} = require('google-auth-library');

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

    static googleLogin (req, res, next) {
        const { token } = req.body
        console.log(req.body)
        const CLIENT_ID = process.env.CLIENT_ID_GOOGLE
        let emailUser

        const client = new OAuth2Client(CLIENT_ID)
            client.verifyIdToken({
                idToken: token,
                audience: CLIENT_ID,
            })
            .then((ticket) => {
                // const payload = ticket.getPayload()
                const { email } = ticket.getPayload()
                // console.log(email)
                emailUser = email
                return User.findOne ({
                    where : {
                        email : emailUser
                    }
                })
            })
            .then((user) => {
                // console.log(user)
                if (!user) {
                    return User.create({
                        email: emailUser,
                        password: process.env.USER_PASSWORD_DEF
                    })
                } else {
                    const payload = {email : user.email, id : user.id}
                    const access_token = generateToken(payload)
                    // console.log(access_token)
                    res.status(200).json({
                        access_token
                    })
                }
            })
            .then((user) => {
                // console.log(user)
                // console.log("then kedua")   
                const payload = {email : user.email, id : user.id}
                const access_token = generateToken(payload)
                    // console.log(access_token)
                    res.status(201).json({
                        access_token
                    })
            })
            .catch(err => {
                next(err)
            })
    }
}


module.exports = UserController