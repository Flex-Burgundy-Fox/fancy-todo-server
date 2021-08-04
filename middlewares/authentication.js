const { decodeToken } = require("../helpers/token");
const { User } = require('../models')

const authentication = (req, res, next) => {
    const { token } = req.headers;

    try {
        if (!token || typeof (token) === undefined || token === '') {
            throw { name: 'Authenticaton Failed' }
        }

        const userDecoded = decodeToken(token);

        User.findByPk(userDecoded.id)
            .then(data => {
                if (!data) {
                    throw { name: 'Authenticaton Failed' }
                }

                req.currentUser = { id: data.id, };
                next();
            })
            .catch((err) => {
                next(err);
            });

    } catch (err) {
        next(err);
    }


}

module.exports = authentication