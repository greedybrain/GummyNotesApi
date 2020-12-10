//! Packages
const config = require('config')
const passport = require('passport');
const express = require('express');
const app = express()

//! Custom 
require('express-async-errors')
require('./config/passport')(passport);
require('./startup/db')(config)
require('./startup/config')(app, express, config, passport)
require('./prod')(app)

//! Listening 
require('./startup/listener')(app)
