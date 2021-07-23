const { Todo } = require ('../models')

class TodoController {

    static readTodo (req, res) {
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
            res.status(500).json({
                error : 'Internal Server Error!'
            })
        })
    }

    static createTodo(req, res) {
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
            res.status(500).json({
                error : 'Internal Server Error!'
            })
        })
    }

    static findTodoId(req, res) {
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
            if(err.message === 'data not found') {
                res.status(404).json({
                    error : err
                })
            } else {
                res.status(500).json({
                    error : 'Internal Server Error!'
                })
            }
            
        })
    }

    static putTodo(req, res) {
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
            if (err.message === 'data not found') {
                res.status(404).json({
                    error : 'data not found!'
                })
            } else if (err.name === 'SequelizeValidationError') {
                res.status(400).json({
                    error : 'Validation Error!'
                })
            } else {
                res.status(500).json({
                    error : 'Internal Server Error!'
                })
            }
        })
    }

    static patchTodo (req, res) {
        let id = +req.params.id
        let input = req.body
        Todo.update({ input }, {
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
            if (err.message === 'data not found') {
                res.status(404).json({
                    error : 'data not found!'
                })
            } else if (err.name === 'SequelizeValidationError') {
                res.status(400).json({
                    error : 'Validation Error!'
                })
            } else {
                res.status(500).json({
                    error : 'Internal Server Error!'
                })
            }
        })
    }

    static deleteTodo(req, res) {
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
            if(err.message === 'data not found') {
                res.status(404).json({
                    error : 'data not found!'
                })
            } else {
                res.status(500).json({
                    error : 'Internal Server Error!'
                })
            }
        })
    }
}

module.exports = TodoController