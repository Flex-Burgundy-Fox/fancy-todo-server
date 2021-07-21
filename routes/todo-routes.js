const router = require('express').Router()

const TodoController = require('../controllers/TodoController')

router.get('/',TodoController.readTodo)
router.post('/', TodoController.createTodo)
router.get('/:id', TodoController.findTodoId)
router.put('/:id',TodoController.putTodo)
router.patch('/:id', TodoController.patchTodo)
router.delete('/:id', TodoController.deleteTodo)




module.exports = router