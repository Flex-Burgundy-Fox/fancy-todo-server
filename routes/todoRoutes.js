const router = require("express").Router()

const TodoController = require("../controllers/todoController")

router.post("/", TodoController.addTodo)

router.get("/", TodoController.showTodos)
router.get("/:id", TodoController.showTodoById)

router.put("/:id", TodoController.updateTodo)

router.patch("/:id", TodoController.updateStatusTodo)

router.delete("/:id", TodoController.deleteTodo)

module.exports = router