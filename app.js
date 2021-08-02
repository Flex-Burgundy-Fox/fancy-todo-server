require('dotenv').config()
const express = require('express')
const app = express()
const port = 3000
const routes = require('./routes/index.js')
const errorHandler = require('./helper/errorHandler.js')
const cors = require('cors')
 
app.use(cors())

app.use(express.urlencoded({extended : true}))
app.use(express.json())

app.use(routes)
app.use(errorHandler)

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

