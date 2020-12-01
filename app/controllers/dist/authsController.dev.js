"use strict";

//! Custom
var _require = require('../models/user'),
    User = _require.User; //! Packages


var passport = require('passport');

var _ = require('lodash');

var Joi = require('joi');

var bcrypt = require('bcrypt'); // const loginUser = async (req, res) => {
//         // Check for errors client side
//         const { error } = validate(req.body)
//         if (error) return res.status(400).send(error.message)
//         // Check if user exists and is valid
//         let user = await User.findOne({ email: req.body.email })
//         if(!user) return res.status(400).send("Invalid email or password")
//         /*
//         Use lodash pick method to pick the props we want to use from req.body 
//         Grab the name email password, then check to see if the password matches
//         the hashed version using bcrypt
//         */
//         const isValidPassword = await bcrypt.compare(req.body.password, user.password)
//         if (!isValidPassword) return res.status(400).send("Invalid email or password")
//         const token = user.generateAuthToken()
//         res.header('x-auth-token', token).send({
//                 token,
//                 user: _.pick(user, ['_id', 'name', 'email'])
//         })
// }


var loginUser = function loginUser(req, res, next) {
  var _validate, error;

  return regeneratorRuntime.async(function loginUser$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _validate = validate(req.body), error = _validate.error;

          if (!error) {
            _context.next = 3;
            break;
          }

          return _context.abrupt("return", res.status(400).send(error.message));

        case 3:
          passport.authenticate('local', function (err, user, info) {
            if (err) return next(err);
            if (!user) return res.status(400).send("Invalid user");
            req.logIn(user, function (err) {
              if (err) return next(err);
              user = _.pick(user, ['name', 'email', 'notes']);
              res.send(user);
            });
          })(req, res, next);

        case 4:
        case "end":
          return _context.stop();
      }
    }
  });
};

var logoutUser = function logoutUser(req, res) {
  return regeneratorRuntime.async(function logoutUser$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          req.logout();
          req.session.cookie.expires = Date.now();
          res.send('Logged out successfully');

        case 3:
        case "end":
          return _context2.stop();
      }
    }
  });
}; //! Validations


var validate = function validate(req) {
  var schema = Joi.object({
    email: Joi.string().min(5).max(100).required().email(),
    password: Joi.string().min(8).max(255).required()
  });
  return schema.validate(req);
};

module.exports = {
  loginUser: loginUser,
  logoutUser: logoutUser
};