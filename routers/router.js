const router = require('express').Router()
const ToDoController = require('../controllers/TodoController')
const LoginController = require('../controllers/LoginController')
const authentication = require("../middlewares/authentication");
const authorization = require("../middlewares/authorization");

router.post('/register', LoginController.register)
router.post('/login', LoginController.login)
router.post('/login_google', LoginController.loginGoogle)

router.use(authentication);
router.get('/todos', ToDoController.listTodo)
router.post('/todos', ToDoController.addTodo)

router.get('/dash_user', ToDoController.getDashDataUser)
router.get('/dash_open', ToDoController.getDashDataOpen)
router.get('/dash_closed', ToDoController.getDashDataClosed)

router.get('/todos/:id', authorization, ToDoController.findOneTodo)
router.put('/todos/:id', authorization, ToDoController.editAllAttributesTodo)
router.patch('/todos/title/:id', authorization, ToDoController.editTitleTodo)
router.patch('/todos/description/:id', authorization, ToDoController.editDescriptionTodo)
router.patch('/todos/due_date/:id', authorization, ToDoController.editDueDateTodo)
router.patch('/todos/status/:id', authorization, ToDoController.editStatusTodo)
router.delete('/todos/:id', authorization, ToDoController.deleteTodo)

module.exports = router