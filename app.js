if (process.env.NODE_ENV != 'production') require('dotenv').config()
const express = require('express')
const app = express()
const PORT = process.env.PORT || 3000
const errorHandler = require('./middlewares/ErrHandler')
const router = require('./routes/index')
const cors = require('cors')

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use(router)
app.use(errorHandler)

app.listen(PORT, () => {
    console.log(`this app is listening to localhost/${PORT}`)
})