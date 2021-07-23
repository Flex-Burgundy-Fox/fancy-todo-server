const { Todo, User } = require("../models")
const moment = require("moment")

class TodoController {
  static addTodo(req, res) {
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
      .catch((err) => {
        console.log(err)
        if (err.name === "SequelizeValidationError") {
          const message = err.errors[0].message

          res.status(400).json({ message })
        } else {
          const message = err.name

          res.status(500).json({ message })
        }
      })
  }

  static showTodos(req, res) {
    Todo.findAll({
      order: [
        ["id", "ASC"]
      ]
    })
      .then((result) => res.status(200).json({ todos: result }))
      .catch((err) => {
        const message = err.name

        res.status(500).json({ message })
      })
  }

  static showTodoById(req, res) {
    const id = +req.params.id

    Todo.findByPk(id)
      .then((result) => {
        if (result === null) {
          res.status(404).json({ message: "Data not found" })
        } else {
          res.status(200).json({ todo: result })
        }
      })
      .catch((err) => {
        const message = err.name

        res.status(500).json({ message })
      })
  }

  static updateTodo(req, res) {
    const id = +req.params.id

    const { title, description, status, due_date } = req.body

    Todo.update({ id, title, description, status, due_date }, {
      where: {
        id
      },
      returning: true
    })
      .then((result) => {
        const status = result[0]

        if (status) {
          const updatedTodo = result[1][0]

          res.status(200).json({ todo: updatedTodo })
        } else {
          res.status(404).json({ message: "Data not found" })
        }
      })
      .catch((err) => {
        if (err.name === "SequelizeValidationError") {
          const message = err.errors[0].message

          res.status(400).json({ message })
        } else {
          const message = err.name

          res.status(500).json({ message })
        }
      })
  }

  static updateStatusTodo(req, res) {
    const id = +req.params.id

    const status = req.body.status

    Todo.update({ status }, {
      where: {
        id
      },
      returning: true
    })
      .then((result) => {
        const status = result[0]

        if (status) {
          const updatedTodo = result[1][0]
          
          res.status(200).json({ todo: updatedTodo })
        } else {
          res.status(404).json({ message: "Data not found" })
        }
      })
      .catch((err) => {
        if (err.name === "SequelizeValidationError") {
          const message = err.errors[0].message

          res.status(400).json({ message })
        } else {
          const message = err.name

          res.status(500).json({ message })
        }
      })
  }

  static deleteTodo(req, res) {
    const id = +req.params.id

    Todo.destroy({
      where: {
        id
      }
    })
      .then((result) => {
        const status = result
        
        if (status) {
          res.status(200).json({ message: "Success, data has been deleted" })
        } else {
          res.status(404).json({ message: "Data not found" })
        }
      })
      .catch((err) => {
        const message = err.name

        res.status(500).json({ message })
      })
  }
}

module.exports = TodoController