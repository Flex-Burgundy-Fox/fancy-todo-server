const Controller = require('../controllers/todos')

const router = require('express').Router()

router.post("/todos",Controller)

module.exports = router