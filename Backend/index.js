const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
require('dotenv').config()
//s
const app = express()
app.use(express.json())
app.use(cors())


mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true
})

const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('connected to database'))

const usersRouter = require('./routes/user.js')
app.use('/users', usersRouter)


app.listen(8081, () => {
    console.log('started')
})