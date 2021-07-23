const ControllerTodo = require('../controllers/todos')
const ControllerUser = require('../controllers/users')
const router = require('express').Router()
const {authentication, authorization} = require('../helper/auth')

router.post("/register",ControllerUser.register)
router.post("/login",ControllerUser.login)

router.use(authentication)
router.post("/todos", ControllerTodo.addTodo)
router.get("/todos", ControllerTodo.viewTodo)

router.get("/todos/:id", authorization, ControllerTodo.findTodo)
router.put("/todos/:id", authorization, ControllerTodo.putTodo)
router.patch("/todos/:id", authorization, ControllerTodo.patchTodo)
router.delete("/todos/:id", authorization, ControllerTodo.deleteTodo)


module.exports = router