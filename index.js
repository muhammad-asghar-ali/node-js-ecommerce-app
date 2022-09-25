require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const db = require('./db')

const app = express()

app.use(cors())
app.use(morgan('tiny'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
db.connect()

const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log(`app is runnig on port ${port}`)
})