"use strict";

//! Packages
var express = require('express');

var authRouter = express.Router();

var cors = require('cors'); //! Custom


var _require = require('../controllers/authsController'),
    loginUser = _require.loginUser,
    logoutUser = _require.logoutUser; //! Create login request


authRouter.post('/', cors(), function _callee(req, res) {
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(loginUser(req, res));

        case 2:
          return _context.abrupt("return", _context.sent);

        case 3:
        case "end":
          return _context.stop();
      }
    }
  });
});
authRouter["delete"]('/logout', function _callee2(req, res) {
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return regeneratorRuntime.awrap(logoutUser(req, res));

        case 2:
          return _context2.abrupt("return", _context2.sent);

        case 3:
        case "end":
          return _context2.stop();
      }
    }
  });
}); //! Export router to use in index.js file 

module.exports = authRouter;