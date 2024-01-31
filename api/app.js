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

process.env.NODE_ENV !== 'prod' && app.use(logger('dev'))
app.use(express.json({ limit: '10kb' }))
app.use(express.urlencoded({ extended: false, limit: '10kb' }))
// app.use(cors({ origin: '127.0.0.1', credentials: true }))
app.use(cookieParser())
app.use(setCache())
app.use(express.static(path.join(__dirname, 'public')))

rateLimiter(app)

app.use('/', indexRouter)
app.use('/users', usersRouter)
app.use('/favorites', favoritesRouter)
app.use('/ratings', ratingsRouter)
app.use('/notes', notesRouter)

app.use(notFound)
app.use(errorHandler)

module.exports = app
