const {Todo} = require("../models")

class TodoController {
    static createTodo(req, res, next) {
        const {title, description, status, due_date} = req.body
        const UserId = req.currentUser.id
        Todo.create({title, description, status, due_date, UserId})
        .then((data) => {
            res.status(201).json({
                result: data
            }) 
        })
        .catch((err) => {
           next(err)
        })
    }

    static showTodos(req, res, next) {
        Todo.findAll({
            where: {UserId : req.currentUser.id},
            order: [['id', 'ASC']]
        })
        .then((data) => {
            if (!data) {
                res.status(200).json({
                    result : []
                })
            } else {
                res.status(200).json({
                    result : data
                })
            }
        })
        .catch((err) => {
            next(err)
        })
    }

    static getTodoId(req, res, next) {

        Todo.findOne({
            where : {id: +req.params.id}
        })
        .then((data) => {
            if (!data) {
                throw ({name : "Not Found"})
            } else {
                res.status(200).json({
                    result: data
                }) 
            }
        })
        .catch((err) => {
            next(err)
        })
    }

    static putTodo (req, res, next) {
        const {title, description, status, due_date} = req.body
        Todo.update({title, description, status, due_date},
            {where: {id: +req.params.id},
            returning: true
        })
        .then((data) => {
            if (data[0] === 0) {
                throw ({name: "Not Found"})
            } else {
                res.status(200).json({
                    result: data[1][0]
                }) 
            }
        })
        .catch((err) => {
            next(err)
        })
    }

    static patchTodo (req, res, next) {
        const {status} = req.body
        Todo.update({status}, {
                where: {id: +req.params.id},
                returning: true
        })
        .then((data) => {
            if (data[0] === 0) {
                throw ({name: "Not Found"})
            } else {
                res.status(200).json({
                    result: data[1][0]                
                }) 
            }
        })
        .catch((err) => {
           next(err)
        })
    }

    static deleteTodo(req, res, next) {
        Todo.destroy({
            where : {id : +req.params.id}
        })
        .then((data => {
            if(data === 0){
                throw ({name: "Not Found"})
            } else{
                res.status(200).json({message : 'todo success to delete'})
            }
        }))
        .catch((err) => {
           next(err)
        })
    }
}

module.exports = TodoController