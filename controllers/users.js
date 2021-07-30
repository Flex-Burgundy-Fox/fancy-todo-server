const {User} = require("../models")
const {comparer} = require("../helper/bcrypt.js")
const {generateToken} = require("../helper/jwt.js")

class Controller {
    static register (req, res, next){
        User.create(req.body)
        .then((result) => {
            res.status(201).json(result)
        }).catch((err) => {
            next(err)
        });
    }
    
    static login (req, res, next){
        User.findOne({
            where : {
                email : req.body.email
            }
        })
        .then((result) => {
            if(!result) next({name : "Username or Password is wrong"})
            
            if(comparer(req.body.password, result.password)){
                const token = generateToken({
                    id : result.id,
                    email: result.email
                })
                res.status(200).json({access_token : token})
            } 
            else next({name : "Username or Password is wrong"}) 
        }).catch((err) => {
            next(err)
        });
    }
}

module.exports = Controller