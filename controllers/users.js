const {User} = require("../models")
const {comparer} = require("../helper/bcrypt.js")
const {generateToken} = require("../helper/jwt.js")
const {OAuth2Client} = require('google-auth-library');
const CLIENT_ID = process.env.CLIENT_ID_GOOGLE

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

    static google(req, res, next){
        let token = req.body.token
        let emailUser
        const client = new OAuth2Client(CLIENT_ID);

        client.verifyIdToken({
            idToken: token,
            audience: CLIENT_ID,
        })
        .then((ticket) => {
            const {email} = ticket.getPayload();
            emailUser = email
            return User.findOne({where : { email: email}})
        })
        .then(user => {
            console.log(user);
            if(!user){
                return User.create({
                    email : emailUser,
                    password: Math.random() *100 + "aiueo"
                })
            }else{
                const token = generateToken({
                    id : user.id,
                    email: user.email
                })
                res.status(200).json({access_token : token})

            }
        })
        .then(user => {
            const token = generateToken({
                id : user.id,
                email: user.email
            })
            res.status(201).json({access_token : token})
        })
        .catch((err) => {
            next(err)
        });

    }
}

module.exports = Controller