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
      next({ name : 'JWT invalid'})
    }
}

function authorization (req, res, next){

    Todo.findOne({
        where : {
            id : +req.params.id
        }
    })
    .then((result) => {
        if(!result) throw {
            name: 'NOT FOUND' , 
            message : 'Todo not found'
        }
        if(result.UserId === req.currentUser.id) next()
        else throw {name : 'UNAUTHORIZED' , message : 'Access Invalid'}
    }).catch((err) => {
        if(err.name === 'NOT FOUND') res.status(404).json(err.message)
        if(err.name === 'UNAUTHORIZED') res.status(401).json(err.message)
        res.status(500).json(err)
    });

}

module.exports = {authentication, authorization}