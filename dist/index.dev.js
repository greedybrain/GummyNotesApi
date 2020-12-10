"use strict";

//! Packages
var config = require('config');

var passport = require('passport');

var express = require('express');

var app = express(); //! Custom 

require('express-async-errors');

require('./config/passport')(passport);

require('./startup/db')(config);

require('./startup/config')(app, express, config, passport);

require('./prod')(app); //! Listening 


require('./startup/listener')(app);