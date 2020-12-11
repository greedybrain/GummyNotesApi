//! Packages
const express = require('express');
const authRouter = express.Router()
const cors = require('cors');

//! Custom
const { loginUser, logoutUser } = require('../controllers/authsController')

//! Create login request
authRouter.post('/', async (req, res) => await loginUser(req, res))
authRouter.delete('/logout', async (req, res) => await logoutUser(req, res))

//! Export router to use in index.js file 
module.exports = authRouter