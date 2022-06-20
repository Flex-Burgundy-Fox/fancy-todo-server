const router = require('express').Router()

const TodoController = require('../controllers/TodoController')

const { authorization } = require('../middlewares/Auth')

router.get('/',TodoController.readTodo)
router.post('/', TodoController.createTodo)
//params hanya bisa diambil bila level middleware ada di route level
router.get('/:id', authorization, TodoController.findTodoId)
router.put('/:id', authorization, TodoController.putTodo)
router.patch('/:id', authorization, TodoController.patchTodo)
router.delete('/:id', authorization, TodoController.deleteTodo)




module.exports = router