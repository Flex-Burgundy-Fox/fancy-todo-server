const { Todo } = require("../models")

class TodoController {
  static addTodo(req, res, next) {
    const { title, description, status, due_date } = req.body

    const UserId  = req.currentUser.id

    Todo.create({ 
      title,
      description,
      status,
      due_date,
      UserId
    })
      .then((result) => res.status(201).json({ todo: result }))
      .catch((err) => next(err))
  }

  static showTodos(req, res, next) {
    Todo.findAll({
      order: [
        ["id", "ASC"]
      ],
      where: {
        UserId: req.currentUser.id
      }
    })
      .then((result) => res.status(200).json({ todos: result }))
      .catch((err) => next(err))
  }

  static showTodoById(req, res, next) {
    const id = +req.params.id

    Todo.findByPk(id)
      .then((result) => res.status(200).json({ todo: result }))
      .catch((err) => next(err))
  }

  static updateTodo(req, res, next) {
    const id = +req.params.id

    const { title, description, status, due_date } = req.body

    Todo.update({ id, title, description, status, due_date }, {
      where: {
        id
      },
      returning: true
    })
      .then((result) => {
        const updatedTodo = result[1][0]

        res.status(200).json({ todo: updatedTodo })
      })
      .catch((err) => next(err))
  }

  static updateStatusTodo(req, res, next) {
    const id = +req.params.id

    const status = req.body.status

    Todo.update({ status }, {
      where: {
        id
      },
      returning: true
    })
      .then((result) => {
        const updatedTodo = result[1][0]
        
        res.status(200).json({ todo: updatedTodo })
      })
      .catch((err) => next(err))
  }

  static deleteTodo(req, res, next) {
    const id = +req.params.id

    Todo.destroy({
      where: {
        id
      }
    })
      .then(() => res.status(200).json({ message: "Success, data has been deleted" }))
      .catch((err) => next(err))
  }
}

module.exports = TodoController