const { verifyToken } = require("../helper");
const { User, Todo } = require("../models")

function authentication(req, res, next) {
    const { access_token } = req.headers
    try {
        if (!access_token) {
            throw ({name : "Token Error"})
        }
        const userToken = verifyToken(access_token)
        User.findByPk(userToken.id)
        .then((user) => {
            if (user) {
                req.currentUser = {
                    id : user.id
                }
                next()
            }
            else {
                throw({
                    name: "Authentication Error"
                })
            }
        })
        .catch((err) => {
            next(err)
        })
    }
    catch(err) {
        next(err)
    }
}

function authorization(req, res, next) {
    Todo.findOne({
        where : {
            id: +req.params.id
        }
    })
    .then((todo) => {   
        if (todo) {
            if (todo.UserId === req.currentUser.id) {
                next()
            } else {
                throw({
                    name: "Authorization Error"
                })
            }  
        } else {
            throw({
                name: "Authorization Error"
            })
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
