const sequelize = require('../config/db')

class ToDoController {
    static listTodo(req, res) {
        sequelize.query('select * from "Todos"', { type: sequelize.QueryTypes.SELECT })
            .then(data => {
                res.status(200).json({ result: data })
            })
            .catch(err => {
                res.status(200).json({ error: err })
            })
    }

    static addTodo(req, res) {
        const { title, description, due_date } = req.body
        sequelize.query(`insert into public."Todos" (title, description, due_date, "createdAt") 
                         values ('${title}', '${description}', '${due_date}', '${due_date}')`,
            { type: sequelize.QueryTypes.INSERT })
            .then(data => {
                res.status(200).json({ result: data })
            })
            .catch(err => {
                res.status(200).json({ error: err })
            })
    }
}

module.exports = ToDoController