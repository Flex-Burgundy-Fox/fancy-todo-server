require("dotenv").config()

const express = require('express')
const app = express()
const port = 3000
const cors = require("cors")

const routes = require('./routes')

const errorHandlers =  require("./middlewares/errorHandlers")

app.use(cors())

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(routes)
app.use(errorHandlers)

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})