const { decodeToken } = require('../helpers/helpersIndex')
const { User, Todo } = require('../models')

function authentication (req, res, next) {
    const { access_token } = req.headers

    if (!access_token) return next({error : 'No Access Token'})

    try {
        const decoded = decodeToken(access_token)
        User.findByPk(decoded.id)
            .then((userData) => {
                if (!userData) {
                    throw {error : 'Invalid Token'}
                } else {
                    req.currentUser = {
                        id: userData.id,
                    }
                    next()
                }
            })
            .catch((err) => {
                next(err)
            })
    } catch (err) {
        next(err)
    }
}

function authorization(req, res, next) {
    let id = +req.params.id
    Todo.findByPk(id)
    .then((todo) => {
        console.log(todo)
        if (!todo) {
            throw {error : 'Authorization Error'}
        } else {
            if (todo.UserId === req.currentUser.id) {
                next()
            } else {
                throw {
                    error : 'Authorization Error'
                }
            }
        }
    })
    .catch((err) => {
        next(err)
    })
}

module.exports = {
    authentication,
    authorization
}