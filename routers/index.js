const router = require('express').Router()
const ToDoController = require('../controllers/TodoController')

router.get('/todos', ToDoController.listTodo)

module.exports = router