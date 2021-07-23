const { User, Todo } = require("../models")

const { decodeToken } = require("../helpers/jwt")

function authentification(req, res, next) {
  const { access_token } = req.headers

  try {
    const userDecoded = decodeToken(access_token)

    User.findByPk(userDecoded.id)
      .then((user) => {
        req.currentUser = {
          id: user.id
        }
        next()
      })
      .catch((err) => res.status(500).json({ err }))
  } catch (err) {
    res.status(401).json({ message: "invalid token" })
  }
}

function authorization(req, res, next) {
  const id = +req.params.id

  Todo.findOne({
    where: {
      id
    }
  })
    .then((todo) => {
      if (!todo) {
        throw {
          name: "AuthorizationError",
          message: "Todo Not Found"
        }
      } else {
        if (todo.UserId === req.currentUser.id) {
          next()
        } else {
          throw {
            name: "AuthorizationError",
            message: "User Not Authorized"
          }
        }
      }
    })
    .catch((err) => {
      if (err.name === "AuthorizationError") {
        const message = err.message

        res.status(401).json({ message })
      } else {
        res.status(500).json({ err })
      }
    })
}

module.exports = {
  authentification,
  authorization
}