const bcrypt = require('bcryptjs');

function hash (password){
    let salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(password, salt);
}

function comparer (userPW, dbPW){
    return bcrypt.compareSync(userPW, dbPW); // true
}

module.exports = {
    hash, comparer
}
