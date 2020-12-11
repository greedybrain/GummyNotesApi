"use strict";

var auth = require('../app/routes/auths');

var users = require('../app/routes/users');

var session = require('express-session');

var cors = require('cors');

var mongoose = require('mongoose');

var MongoStore = require('connect-mongo')(session);

module.exports = function (app, express, config, passport) {
  app.use(express.json());
  app.use(express.urlencoded({
    extended: true
  }));
  app.use(cors({
    origin: 'https://gifted-dubinsky-612231.netlify.app',
    // react connection,
    allowedHeaders: ['Access-Control-Allow-Origin', 'Access-Control-Allow-Headers'],
    credentials: true
  }));
  app.use(session({
    secret: config.get("sessionKey"),
    store: new MongoStore({
      mongooseConnection: mongoose.connection
    }),
    resave: true,
    saveUninitialized: true
  }));
  app.use(passport.initialize());
  app.use(passport.session());
  app.use('/api/v1/auth', auth);
  app.use('/api/v1/users', users);
};