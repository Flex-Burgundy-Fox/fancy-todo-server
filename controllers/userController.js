const { User } = require("../models")

const { comparePassword } = require("../helpers/bcrypt")
const { generateToken } = require("../helpers/jwt")

const { OAuth2Client } = require('google-auth-library')

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

  // google sign-in
  static googleLogin(req, res, next) {
    // in this case login with google sign-in
    // when user not found in database, so will create user in database and login to app
    // and send access token to client

    const { token } = req.body

    const CLIENT_ID = process.env.CLIENT_ID

    const client = new OAuth2Client(CLIENT_ID)

    let emailUser

    client.verifyIdToken({
      idToken: token,
      audience: CLIENT_ID,  // Specify the CLIENT_ID of the app that accesses the backend
      // Or, if multiple clients access the backend:
      //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
    })
    // promise chainning
      .then((ticket) => {
        const { email } = ticket.getPayload()
        
        emailUser = email

        // check user in database
        return User.findOne({
          where: {
            email
          }
        })
      })
      .then((user) => {
        // when the user is not found in the database
        // it will create the user to the database
        if (!user) {
          return User.create({
            email: emailUser,
            password: Math.random() * 1000 + "qwertyuiop"
          })
        } else {
          // when the user is found in the database
          const token = generateToken({
            id: user.id,
            email: user.email
          })
          
          res.status(200).json({ access_token: token })
        }
      })
      .then((user) => {
        // in this case the user is not found, so after creating the user in the database
        // it will generate token and send access_token to client
        const token = generateToken({
          id: user.id,
          email: user.email
        })
        
        res.status(201).json({ access_token: token })
      })
      .catch((err) => next(err))
  }
}

module.exports = UserController