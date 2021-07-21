const router = require('express').Router()

const TodoController = require('../controllers/TodoController')

router.get('/',TodoController.readTodo)
router.post('/add', TodoController.createTodo)





module.exports = router