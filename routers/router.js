const router = require('express').Router()
const ToDoController = require('../controllers/TodoController')
const LoginController = require('../controllers/LoginController')
const authentication = require("../middlewares/authentication");
const authorization = require("../middlewares/authorization");

router.post('/register', LoginController.register)
router.post('/login', LoginController.login)

router.use(authentication);
router.get('/todos', ToDoController.listTodo)
router.post('/todos', ToDoController.addTodo)

router.get('/todos/:id', authorization, ToDoController.findOneTodo)
router.put('/todos/:id', authorization, ToDoController.editAllAttributesTodo)
router.patch('/todos/:id', authorization, ToDoController.editSomeAttributesTodo)
router.delete('/todos/:id', authorization, ToDoController.deleteTodo)

module.exports = router