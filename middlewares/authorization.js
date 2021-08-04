const { Todo } = require("../models");

function authorization(req, res, next) {

    Todo.findOne({
        where: {
            id: req.params.id,
        }
    })
        .then((data) => {
            if (!data) {
                throw { name: 'Data not found' }
            }

            if (data.UserId !== req.currentUser.id) {
                throw { name: "Authorization Error" };
            } else {
                next();
            }
        })
        .catch((err) => {
            next(err);
        });
}

module.exports = authorization