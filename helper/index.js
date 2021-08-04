const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken")
const PRIVATE_KEY = process.env.PRIVATE_KEY

function hashedPassword(userPassword) {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(userPassword, salt);
    return hash
}

function comparePassword(userPassword, hashedPassword) {
    return bcrypt.compareSync(userPassword, hashedPassword);
}

function generateToken(payload) {
    return jwt.sign(payload, PRIVATE_KEY)
}

function verifyToken(token){
    return jwt.verify(token, PRIVATE_KEY)
}

module.exports = {
    hashedPassword,
    comparePassword,
    generateToken,
    verifyToken
}