const bcrypt = require("bcrypt")
const saltRounds = 10

function hashingPassword(plaintextPassword ) {
  const salt = bcrypt.genSaltSync(saltRounds)
  const hash = bcrypt.hashSync(plaintextPassword, salt)
  // Store hash in your password DB.
  return hash
}

function comparePassword(plaintextPassword, hash) {
  // Load hash from your password DB.
  return bcrypt.compareSync(plaintextPassword, hash)
}

module.exports = { 
  hashingPassword,
  comparePassword
 }