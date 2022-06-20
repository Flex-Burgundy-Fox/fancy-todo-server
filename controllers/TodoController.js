const { Todo } = require ('../models')

class TodoController {

    static readTodo (req, res, next) {
        Todo.findAll({
            where : {
                UserId : req.currentUser.id
            }
        })
        .then((data) => {
            res.status(200).json({
                result: data
            })
        })
        .catch(err => {
            next(err)
        })
    }

    static createTodo(req, res, next) {
        let {title, description, due_date} = req.body
        Todo.create(
            {
                title, 
                description, 
                due_date,
                UserId : req.currentUser.id
            })
        .then((data) =>{
            res.status(201).json({
                result : data
            })
        })
        .catch(err => {
            next(err)
        })
    }

    static findTodoId(req, res, next) {
        let id = +req.params.id
        Todo.findByPk(id)
        .then((data) => {
            if (data) {
                res.status(200).json({
                    result : data
                })
            } else {
                throw {message : 'data not found'}
            }
        })
        .catch(err => {
            next(err)
        })
    }

    static putTodo(req, res, next) {
        let id = +req.params.id
        let input = req.body
        Todo.update(input, {
            where: {
               id : id
            },
            returning : true
        })
        .then((data) => {
            if (data) {
                res.status(200).json({
                    result: data[1][0]
                })
            } else {
                throw { message : 'data not found' }
            }
        })
        .catch((err) => {
           next(err)
        })
    }

    static patchTodo (req, res, next) {
        let id = +req.params.id
        let status = req.body.status
        Todo.update({ status }, {
            where: {
                id : id
            },
            returning : true
        })
        .then((data) => {
            if (data) {
                res.status(200).json({
                    result: data
                })
            } else {
                throw { message : 'data not found' }
            }
        })
        .catch((err) => {
            next(err)
        })
    }

    static deleteTodo(req, res, next) {
        let id = +req.params.id

        Todo.destroy({
            where : {
                id
            },
            returning : true
        })
        .then((data) => {
            if (data) {
                res.status(200).json({
                    result : 'todo success to delete'
                })
            } else {
                throw {message: 'data not found'}
            }
        })
        .catch(err => {
            next(err)
        })
    }
}

module.exports = TodoController