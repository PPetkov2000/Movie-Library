const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const connectDB = require('./config/database')
const setCache = require('./middleware/setCache')
const { rateLimiter } = require('./utils/rateLimiter')
const { notFound, errorHandler } = require('./middleware/errorHandler')
const indexRouter = require('./routes/index')
const usersRouter = require('./routes/users')
const favoritesRouter = require('./routes/favorites')
const ratingsRouter = require('./routes/ratings')
const notesRouter = require('./routes/notes')

require('dotenv').config()
connectDB()

const app = express()

rateLimiter(app)

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
// app.use(cors())
app.use(cookieParser())
app.use(setCache())
app.use(express.static(path.join(__dirname, 'public')))

app.use('/', indexRouter)
app.use('/users', usersRouter)
app.use('/favorites', favoritesRouter)
app.use('/ratings', ratingsRouter)
app.use('/notes', notesRouter)

app.use(notFound)
app.use(errorHandler)

module.exports = app
