const router = require('express').Router()
const todoRoutes = require('./todo-routes')
const userRoutes = require('./user-routes')
const { authentication } = require('../middlewares/Auth')

router.use('/users', userRoutes)
router.use(authentication)
//authentication dapat digunakan untuk middleware level
router.use('/todos',todoRoutes)







module.exports = router