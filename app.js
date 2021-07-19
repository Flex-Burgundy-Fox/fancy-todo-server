const express = require('express')
const router = require('./routes')
const app = express()
const port = 3000

app.use(express.urlencoded({extended: true}))
app.use(express.json())

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use(router)

app.listen(port, () => {
  console.log(`Example Todo_App listening at http://localhost:${port}`)
})