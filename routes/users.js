const router = require("express").Router()
const UserController = require("../controllers/Users")


router.post("/register", UserController.registers)
router.post("/login", UserController.login)


module.exports = router