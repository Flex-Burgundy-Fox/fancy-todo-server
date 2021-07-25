const sequelize = require('../config/db')
const { Todo } = require('../models')

class ToDoController {
    static listTodo(req, res, next) {
        sequelize.query(`select a.id, title, description, status, due_date, a."createdAt", a."updatedAt", email 
                            from "Todos" a
                            inner join "Users" b on a."UserId" = b.id `, { type: sequelize.QueryTypes.SELECT })
            .then(data => {
                if (data.length === 0) {
                    throw { name: 'No data exist' }
                } else {
                    res.status(200).json({ result: data })
                }
            })
            .catch(err => {
                console.log(err);
                next(err)
            })
    }

    static findOneTodo(req, res, next) {
        const id = +req.params.id
        sequelize.query(`select a.id, title, description, status, due_date, email, a."createdAt", a."updatedAt" 
                            from "Todos" a
                            inner join "Users" b on a."UserId" = b.id 
                            where a.id = ${id} limit 1`, { type: sequelize.QueryTypes.SELECT })
            .then(data => {
                if (data.length === 0) {
                    throw { name: 'No data exist' }
                } else {
                    res.status(200).json({ result: data })
                }
            })
            .catch(err => {
                next(err)
            })
    }

    static addTodo(req, res, next) {
        const { title, description, status, due_date } = req.body
        const UserId = +req.currentUser.id

        // sequelize.query(`insert into public."Todos" (title, description, due_date, "createdAt") 
        //                  values ('${title}', '${description}', '${due_date}', NOW()) returning *`,
        //     { type: sequelize.QueryTypes.INSERT })
        Todo.create({
            title,
            description,
            status,
            due_date,
            UserId
        })
            .then(data => {
                res.status(201).json({ message: "Successfully created", result: data })
            })
            .catch(err => {
                next(err)
            })
    }

    static editAllAttributesTodo(req, res, next) {
        const { title, description, status, due_date } = req.body
        const UserId = +req.currentUser.id

        Todo.update({
            title,
            description,
            status,
            due_date,
            UserId
        }, {
            where: { id: +req.params.id },
            returning: true
        })
            .then(data => {
                if (data[0] === 0) {
                    throw { name: 'Data not found' }
                } else {
                    res.status(200).json({ message: "Successfully updated", result: data[1] })
                }
            })
            .catch(err => {
                next(err)
            })
    }

    static editSomeAttributesTodo(req, res, next) {
        const { status } = req.body
        const { id } = req.params

        Todo.update({
            status
        }, {
            where: { id: +id },
            returning: true
        })
            .then(data => {
                if (data[0] === 0) {
                    throw { name: 'Data not found' }
                } else {
                    res.status(200).json({ message: "Successfully updated", result: data[1] })
                }
            })
            .catch(err => {
                next(err)
            })
    }

    static deleteTodo(req, res, next) {
        const { id } = req.params

        Todo.destroy({
            where: { id: +id }
        })
            .then(data => {
                if (data === 0) {
                    throw { name: 'Data not found' }
                } else {
                    res.status(200).json({ message: "Successfully deleted" })
                }
            })
            .catch(err => {
                next(err)
            })
    }

}

module.exports = ToDoController