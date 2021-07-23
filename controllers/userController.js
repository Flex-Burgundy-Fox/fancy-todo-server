const { User } = require("../models")

const { comparePassword } = require("../helpers/bcrypt")
const { generateToken } = require("../helpers/jwt")

class UserController {
  static register(req, res) {
    const { email, password } = req.body

    User.create({ email, password })
      .then((user) => res.status(201).json({ id: user.id, email: user.email }))
      .catch((err) => {
        const message = err.name

        res.status(500).json({ message })
      })
  }

  static login(req, res) {
    const { email, password } = req.body

    User.findOne({
      where: {
        email
      }
    })
      .then((user) => {
        if (!user) {
          throw {
            name: "LoginFailed",
            message: "User Not Found"
          }
        }

        const correct = comparePassword(password, user.password)

        if (!correct) {
          throw {
            name: "LoginFailed",
            message: "Wrong password"
          }
        }
        // generate token
        const token = generateToken({
          id: user.id,
          email: user.email
        })
        
        res.status(200).json({ access_token: token })
      })
      .catch((err) => {
        if (err.name === "LoginFailed") {
          res.status(400).json({ message: "Wrong Email or Password" })
        } else {
          res.status(500).json({ err })
        }
      })
  }
}

module.exports = UserController