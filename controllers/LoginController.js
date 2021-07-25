const sequelize = require('../config/db')
const { User } = require('../models')
const { comparePassword } = require("../helpers/hash");
const { generateToken } = require("../helpers/token");

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

}

module.exports = LoginController