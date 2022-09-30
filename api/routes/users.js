const express = require('express')
const router = express.Router()
const { isAuth } = require('../middleware/auth')
const { getUsers, getUser, createUser, updateUser, deleteUser, authUser } = require('../controllers/users')
const { createAccountLimiter } = require('../utils/rateLimiter')

router.route('/').get(getUsers).post(createAccountLimiter, createUser)
router.route('/:id').get(getUser).put(isAuth, updateUser).delete(isAuth, deleteUser)
router.route('/login').post(authUser)

module.exports = router
