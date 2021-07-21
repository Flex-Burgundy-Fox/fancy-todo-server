const router = require("express").Router()
const TodoController = require("../controllers/Todos")

router.post("/todos", TodoController.createTodo)
router.get("/todos", TodoController.showTodos)
router.get("/todos/:id", TodoController.getTodoId)
router.put("/todos/:id", TodoController.putTodo)
router.patch("/todos/:id", TodoController.patchTodo)
router.delete("/todos/:id", TodoController.deleteTodo)


module.exports = router