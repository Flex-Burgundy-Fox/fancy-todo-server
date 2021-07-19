const router = require("express").Router()
const TodoController = require("../controllers/Todos")

router.post("/todo", TodoController.createTodo)

module.exports = router