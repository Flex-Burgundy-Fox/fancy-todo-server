const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const PRIVATE_KEY = 'RAHASIA'


function hashingPassword(password) {
  let salt = bcrypt.genSaltSync(10)
  let hashedText = bcrypt.hashSync(password, salt)

  return hashedText
}

function comparePassword(passwordUser, passwordDB) {
  return bcrypt.compareSync(passwordUser, passwordDB)
}

function generateToken(payload) {
  const token = jwt.sign(payload, PRIVATE_KEY)
  return token
}

function decodeToken(token) {
  const decodedToken = jwt.verify(token, PRIVATE_KEY)
  return decodedToken
}

function authentication() {}

module.exports = {
  hashingPassword,
  comparePassword,
  generateToken,
  decodeToken
}
