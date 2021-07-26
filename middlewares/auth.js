const { User, Todo } = require("../models")

const { decodeToken } = require("../helpers/jwt")

function authentification(req, res, next) {
  const { access_token } = req.headers

  if (!access_token) return next({ name: "Missing Access Token" })

  try {
    const userDecoded = decodeToken(access_token)
    
    User.findByPk(userDecoded.id)
      .then((user) => {
        if (!user) {
          throw {
            name: "Authentification Error"
          }
        } else {
          req.currentUser = {
            id: user.id
          }
          next()
        }
      })
      .catch((err) => next(err))
  } catch (err) {
    next(err)
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
          name: "Not Found"
        }
      } else {
        if (todo.UserId === req.currentUser.id) {
          next()
        } else {
          throw {
            name: "Authorization Error"
          }
        }
      }
    })
    .catch((err) => next(err))
}

module.exports = {
  authentification,
  authorization
}