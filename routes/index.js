const Controller = require('../controllers/todos')

const router = require('express').Router()

router.post("/todos",Controller.addTodo)
router.get("/todos",Controller.viewTodo)
router.get("/todos/:id",Controller.findTodo)
router.put("/todos/:id",Controller.putTodo)
router.patch("/todos/:id",Controller.patchTodo)
router.delete("/todos/:id",Controller.deleteTodo)


module.exports = router