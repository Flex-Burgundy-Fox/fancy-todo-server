const { Todo } = require ('../models')

class TodoController {

    static readTodo (req, res) {
        Todo.findAll()
        .then((data) => {
            res.status(200).json({
                result: data
            })
        })
        .catch(err => {
            res.status(500).json({
                error : err
            })
        })
    }

    static createTodo(req, res) {
        let input = req.body
        Todo.create(input)
        .then((data) =>{
            res.status(201).json({
                result : data
            })
        })
        .catch(err => {
            res.status(500).json({
                error : err
            })
        })
    }


}


module.exports = TodoController