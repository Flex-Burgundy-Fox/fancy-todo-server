const router = require('express').Router()
const ToDoController = require('../controllers/TodoController')

router.get('/todos', ToDoController.listTodo)
router.post('/todos', ToDoController.addTodo)

router.put('/todos/:id', ToDoController.editAllAttributesTodo)
router.patch('/todos/:id', ToDoController.editSomeAttributesTodo)
router.delete('/todos/:id', ToDoController.deleteTodo)

module.exports = router