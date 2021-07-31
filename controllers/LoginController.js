const sequelize = require('../config/db')
const { User } = require('../models')
const { comparePassword } = require("../helpers/hash");
const { generateToken } = require("../helpers/token");
const { OAuth2Client } = require('google-auth-library');

class LoginController {
    static register(req, res, next) {
        const { email, password } = req.body

        User.create({
            email,
            password
        })
            .then(data => {
                res.status(201).json({ message: "Successfully registered", email: data.email })
            })
            .catch(err => {
                next(err)
            })
    }

    static login(req, res, next) {
        const { email, password } = req.body

        User.findOne({
            where: { email: email }
        })
            .then(data => {
                if (!data) {
                    throw { name: 'Login Failed', error: 'Email not found' }
                }

                const isCorrect = comparePassword(password, data.password);
                if (!isCorrect) {
                    throw {
                        name: "Login Failed",
                        error: "Email or password is wrong",
                    };
                }

                // generate token
                const token = generateToken({ id: data.id, email: data.email });
                res.status(200).json({ message: "Successfully logged in", token: token })

            })
            .catch(err => {
                next(err)
            })
    }

    static loginGoogle(req, res, next) {
        const { token } = req.body
        const CLIENT_ID = process.env.CLIENT_ID;
        const client = new OAuth2Client(CLIENT_ID);

        let email_google = ''
        let token_google = ''

        client.verifyIdToken({
            idToken: token,
            audience: CLIENT_ID
        })
            .then(ticket => {
                const payload = ticket.getPayload();
                //const {email} = ticket.getPayload();

                email_google = payload.email;

                User.findOne({
                    where: { email: email_google }
                })
                    .then(data => {
                        if (!data) {

                            User.create({
                                email: email_google,
                                password: '123456'
                            })
                                .then(data => {
                                    // generate token & logged in
                                    token_google = generateToken({ id: data.id, email: data.email });
                                    res.status(201).json({ message: "Successfully registered & logged in", token: token_google })
                                })
                                .catch(err => {
                                    next(err)
                                })

                        } else {

                            // generate token
                            token_google = generateToken({ id: data.id, email: data.email });
                            res.status(200).json({ message: "Successfully logged in", token: token_google })
                        }

                    })
                    .catch(err => {
                        next(err)
                    })

            })
            .catch(err => {
                next(err)
            })
    }
}

module.exports = LoginController