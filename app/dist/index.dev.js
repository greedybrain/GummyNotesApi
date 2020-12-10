"use strict";

var _mongoose$connect;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

//! Packages
require('express-async-errors');

var config = require('config');

var mongoose = require('mongoose');

var cors = require('cors');

var passport = require('passport');

var session = require('express-session');

var express = require('express');

var app = express(); //! Custom 

require('./config/passport')(passport);

var auth = require('./routes/auths');

var users = require('./routes/users');

if (!config.get('sessionKey')) {
  console.log("FATAL ERROR: session key is not defined.");
  process.exit(1);
} //! Connecting to database


var connectionString = config.get('connection_string');
mongoose.connect(connectionString, (_mongoose$connect = {
  useFindAndModify: true,
  useUnifiedTopology: true
}, _defineProperty(_mongoose$connect, "useFindAndModify", false), _defineProperty(_mongoose$connect, "useNewUrlParser", true), _defineProperty(_mongoose$connect, "useCreateIndex", true), _mongoose$connect)).then(function () {
  return console.log("Connected to database");
})["catch"](function (err) {
  return console.log(err.message);
}); //! Add middleware 

app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

require('../prod')(app);

app.use(cors({
  origin: 'http://localhost:3000',
  // react connection,
  credentials: true
}));
app.use(session({
  secret: config.get("sessionKey"),
  resave: true,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use('/api/v1/auth', auth);
app.use('/api/v1/users', users); // app.use(handleErrors)
//! Listening 

var PORT = process.env.PORT === undefined ? 5000 : 5000;
app.listen(PORT, function (error) {
  if (error) console.error(error);
  console.log("Listening on PORT ".concat(PORT));
});