const router = require("express").Router()

const todoController = require("../controllers/todoController")

const { authorization } = require("../middlewares/auth")

router.post("/", todoController.addTodo)

router.get("/", todoController.showTodos)
router.get("/:id", authorization, todoController.showTodoById)

router.put("/:id", authorization, todoController.updateTodo)

router.patch("/:id", authorization, todoController.updateStatusTodo)

router.delete("/:id", authorization, todoController.deleteTodo)

module.exports = router