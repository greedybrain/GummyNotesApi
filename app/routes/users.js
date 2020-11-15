//! Packages
const express = require('express')
const userRouter = express.Router()

//! Custom
const { signupUser, getUser } = require('../controllers/usersController')


//! Define routes
userRouter.get('/:id', async (req, res) => await getUser(req, res))
userRouter.post('/', async (req, res) => await signupUser(req, res))

//! Exporting 
module.exports = userRouter