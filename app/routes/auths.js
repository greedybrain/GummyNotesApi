//! Packages
const express = require('express');
const authRouter = express.Router()

//! Custom
const { loginUser } = require('../controllers/authsController')

//! Create login request
authRouter.post('/', async (req, res) => await loginUser(req, res))

//! Export router to use in index.js file 
module.exports = authRouter