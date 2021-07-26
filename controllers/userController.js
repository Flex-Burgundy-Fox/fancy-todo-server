const { User } = require("../models")

const { comparePassword } = require("../helpers/bcrypt")
const { generateToken } = require("../helpers/jwt")

class UserController {
  static register(req, res, next) {
    const { email, password } = req.body

    User.create({ email, password })
      .then((user) => res.status(201).json({ id: user.id, email: user.email }))
      .catch((err) => next(err))
  }

  static login(req, res, next) {
    const { email, password } = req.body

    User.findOne({
      where: {
        email
      }
    })
      .then((user) => {
        if (!user) {
          throw {
            name: "Authentification Error"
          }
        }

        const correct = comparePassword(password, user.password)

        if (!correct) {
          throw {
            name: "LoginFailed"
          }
        }
        // generate token
        const token = generateToken({
          id: user.id,
          email: user.email
        })
        
        res.status(200).json({ access_token: token })
      })
      .catch((err) => next(err))
  }
}

module.exports = UserController