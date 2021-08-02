const { comparePassword, generateToken } = require("../helper")
const {User} = require("../models")
const {OAuth2Client} = require('google-auth-library');

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

    static login(req, res, next) {
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
    
    static loginGoogle(req, res, next) {
        let {token} = req.body
        let CLIENT_ID = process.env.CLIENT_ID
        let emailUser;

        const client = new OAuth2Client(CLIENT_ID)
        client.verifyIdToken({
            idToken : token,
            audience : CLIENT_ID
        })
        .then((ticket) => {
            const {email} = ticket.getPayload()
            emailUser = email
            return User.findOne({ where : {email}})
        })
        .then((user) => {
            if (!user) {
                return User.create({
                    email: emailUser,
                    password: Math.random() * 10000 + "lalapopo"
                })
            } else {
                const token = generateToken({
                    id: user.id,
                    email: user.email
                })
                res.status(200).json({
                    access_token: token
                })   
            }
            
        })
        .then((user) => {
            const token = generateToken({
                id: user.id,
                email: user.email
            })
            res.status(201).json({
                access_token: token
            })   
        })
        .catch((err) => console.log(err))
    }

}

module.exports = UserController