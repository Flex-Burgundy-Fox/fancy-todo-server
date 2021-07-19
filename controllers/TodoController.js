const { Todo } = require('../models')

class ToDoController {
    static listTodo(req, res) {
        Todo.findAll()
            .then(data => {
                res.status(200).json({ result: data })
            })
            .catch(err => {
                res.status(200).json({ error: err })
            })
    }
}

module.exports = ToDoController