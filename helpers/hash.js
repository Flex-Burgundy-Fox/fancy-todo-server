const bcrypt = require("bcryptjs");

function hashPassword(userPassword) {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(userPassword, salt);
    return hash;
}

function comparePassword(userPassword, hashPassword) {
    const isCorrect = bcrypt.compareSync(userPassword, hashPassword);
    return isCorrect;
}

module.exports = {
    hashPassword,
    comparePassword
};