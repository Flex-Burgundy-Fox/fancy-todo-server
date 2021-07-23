const router = require("express").Router()
const userRoutes = require("./userRoutes")
const todoRoutes = require("./todoRoutes")

const { authentification } = require("../middlewares/auth")

router.use("/users", userRoutes)

router.use(authentification)

router.use("/todos", todoRoutes)

module.exports = router