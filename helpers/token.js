const jwt = require("jsonwebtoken");
const PRIVATE_KEY = process.env.PRIVATE_KEY;

function generateToken(payload) {
    const token = jwt.sign(payload, PRIVATE_KEY);
    return token;
}

function decodeToken(token) {
    const decoded = jwt.verify(token, PRIVATE_KEY);
    return decoded;
}

module.exports = {
    generateToken,
    decodeToken
};
