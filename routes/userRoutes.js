const router = require("express").Router()

const userController = require("../controllers/userController")

router.post("/register", userController.register)
router.post("/login", userController.login)
// google sign-in
router.post("/google-login", userController.googleLogin)

module.exports = router