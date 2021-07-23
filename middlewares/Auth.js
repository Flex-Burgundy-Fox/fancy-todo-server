const { decodeToken } = require('../helpers')
const { User, Todo } = require('../models')

function authentication (req, res, next) {
    const { access_token } = req.headers

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
                res.status(500).json({
                    error: 'Internal Server Error'
                })
            })
    } catch (err) {
        res.status(401).json({
            error: 'Invalid Token'
        })
    }
}

function authorization(req, res, next) {
    Todo.findOne({
       id:  req.params.id
    })
    .then((todo) => {
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
        if (err.error === 'Authorization Error') {
            res.status(401).json({
                error: 'User is not authorized!'
            })
        }
        res.status(500).json({
            error: 'Internal Server Error'
        })
    })
}

module.exports = {
    authentication,
    authorization
}