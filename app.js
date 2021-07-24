require("dotenv").config()
const express = require('express')
const router = require('./routes')
const errHandler = require('./middleware/errHandler')
const app = express()
const port = 3000


app.use(express.urlencoded({extended: true}))
app.use(express.json())

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use(router)
app.use(errHandler)

app.listen(port, () => {
  console.log(`Example Todo_App listening at http://localhost:${port}`)
})