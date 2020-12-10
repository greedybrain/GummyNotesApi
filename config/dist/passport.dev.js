"use strict";

var LocalStrategy = require('passport-local').Strategy;

var bcrypt = require('bcrypt'); // Load user model


var _require = require('../models/user'),
    User = _require.User;

module.exports = function (passport) {
  passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
  }, function _callee(email, password, done) {
    return regeneratorRuntime.async(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return regeneratorRuntime.awrap(User.findOne({
              email: email
            }, function (err, user) {
              if (err) return done(err);
              if (!user) return done(null, false, {
                message: "Email not registered"
              });
              bcrypt.compare(password, user.password, function (err, isMatch) {
                if (err) return done(err);
                if (!isMatch) return done(null, false);
                done(null, user);
              });
            }));

          case 2:
          case "end":
            return _context.stop();
        }
      }
    });
  }));
  passport.serializeUser(function (user, done) {
    return done(null, user.id);
  });
  passport.deserializeUser(function _callee2(id, done) {
    return regeneratorRuntime.async(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return regeneratorRuntime.awrap(User.findOne({
              _id: id
            }, function (err, user) {
              return done(err, user);
            }));

          case 2:
            return _context2.abrupt("return", _context2.sent);

          case 3:
          case "end":
            return _context2.stop();
        }
      }
    });
  });
};