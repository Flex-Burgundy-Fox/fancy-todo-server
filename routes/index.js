const router = require('express').Router()
const todoRoutes = require('./todo-routes')
const userRoutes = require('./user-routes')

router.use('/todos',todoRoutes)
router.use('/users', userRoutes)






module.exports = router