const router = require('express').Router()
const ToDoController = require('../controllers/TodoController')

router.get('/todos', ToDoController.listTodo)
router.post('/todos', ToDoController.addTodo)

module.exports = router