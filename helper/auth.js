const {User, Todo} = require('../models');
const {decodeToken} = require('./jwt')

function authentication(req, res, next) {
    if (!req.headers.access_token) return next({name : 'Missing JWT'})
    const token = req.headers.access_token
    try {
        const decoded = decodeToken(token);
        User.findByPk(+decoded.id)
        .then((user) => {
            if(!user) throw {name : 'JWT invalid'} 
            else {
                req.currentUser = {
                    id : user.id
                }
                next()
            }
        }).catch((err) => {
            next(err)
        });
    } catch(err) {
      next(err)
    }
}

function authorization (req, res, next){

    Todo.findOne({
        where : {
            id : +req.params.id
        }
    })
    .then((result) => {
        if(!result) next({name: 'TODO NOT FOUND' }) 
        if(result.UserId === req.currentUser.id) next()
        else next ({name : 'UNAUTHORIZED'})
    }).catch((err) => {
        next(err)
    });

}

module.exports = {authentication, authorization}