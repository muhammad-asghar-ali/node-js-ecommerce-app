require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const db = require('./db')

const authRoutes = require('./Routes/authRoutes')
const userRoutes = require('./Routes/userRoutes')
const productRoutes = require('./Routes/productRoutes')

const app = express()

app.use(cors())
app.use(morgan('tiny'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
db.connect()

app.use('/api/auth', authRoutes)
app.use('/api/user', userRoutes)
app.use('/api/product', productRoutes)

const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log(`app is runnig on port ${port}`)
})