const router = require("express").Router()
const routerUser = require("./users.js")
const TodoController = require("../controllers/Todos.js")
const { authentication, authorization } = require("../middleware/auth.js")

router.use("/users", routerUser)

router.use(authentication)

router.post("/todos", TodoController.createTodo)
router.get("/todos", TodoController.showTodos)
router.get("/todos/:id", authorization, TodoController.getTodoId)
router.put("/todos/:id", authorization, TodoController.putTodo)
router.patch("/todos/:id", authorization, TodoController.patchTodo)
router.delete("/todos/:id", authorization, TodoController.deleteTodo)



module.exports = router