"use strict";

//! Packages
var bcrypt = require('bcrypt');

var _ = require('lodash'); //! Custom


var _require = require('../models/user'),
    User = _require.User,
    validateUser = _require.validateUser;

var _require2 = require('../models/note'),
    validateNote = _require2.validateNote; //! handle errors
// const asyncMiddleware = handler => {
//         return async (req, res, next) => {
//                 try {
//                         await handler(req, res)
//                 } catch (exc) {
//                         next(exc)
//                 }
//         }
// } => then wrap each 'route/action' in this ^ method
//! Helper functions


var getCurrentUser = function getCurrentUser(req, res) {
  var user;
  return regeneratorRuntime.async(function getCurrentUser$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(User.findById(req.user._id).select('-password -createdAt -updatedAt -__v'));

        case 2:
          user = _context.sent;

          if (user) {
            _context.next = 5;
            break;
          }

          return _context.abrupt("return", res.status(404).send("User does not exist"));

        case 5:
          user = _.pick(user, ['name', 'email', 'notes']);
          res.send(user);

        case 7:
        case "end":
          return _context.stop();
      }
    }
  });
}; // const signupUser = async (req, res) => {
// validateUser(req.body, res)
// let user = await User.findOne({ email: req.body.email })
// if(user) return res.status(400).send("User already exists!")
// user = new User(_.pick(req.body, ['name', 'email', 'password', 'confirmPassword']))
// const salt = await bcrypt.genSalt(10)
// user.password = await bcrypt.hash(user.password, salt)
// user.confirmPassword = await bcrypt.hash(user.password, salt)
// user = await user.save()
// const token = user.generateAuthToken()
// res.header('x-auth-token', token).send(_.pick(user, ['_id', 'name', 'email']))
// }


var signupUser = function signupUser(req, res) {
  var _validateUser, error, user;

  return regeneratorRuntime.async(function signupUser$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _validateUser = validateUser(req.body), error = _validateUser.error;

          if (!error) {
            _context2.next = 3;
            break;
          }

          return _context2.abrupt("return", res.status(400).send(error.message));

        case 3:
          _context2.next = 5;
          return regeneratorRuntime.awrap(User.findOne({
            email: req.body.email
          }));

        case 5:
          user = _context2.sent;

          if (!user) {
            _context2.next = 8;
            break;
          }

          return _context2.abrupt("return", res.status(400).send("User already exists!"));

        case 8:
          user = new User(_.pick(req.body, ['name', 'email', 'password', 'confirmPassword']));
          _context2.next = 11;
          return regeneratorRuntime.awrap(bcrypt.hash(req.body.password, 10));

        case 11:
          user.password = _context2.sent;
          _context2.next = 14;
          return regeneratorRuntime.awrap(bcrypt.hash(req.body.confirmPassword, 10));

        case 14:
          user.confirmPassword = _context2.sent;
          _context2.next = 17;
          return regeneratorRuntime.awrap(user.save());

        case 17:
          user = _context2.sent;
          res.send(user);

        case 19:
        case "end":
          return _context2.stop();
      }
    }
  });
};

var getCurrentUsersNotes = function getCurrentUsersNotes(req, res) {
  var user, notes;
  return regeneratorRuntime.async(function getCurrentUsersNotes$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return regeneratorRuntime.awrap(User.findById(req.user._id).select('-password'));

        case 2:
          user = _context3.sent;
          notes = user.notes.sort(function (a, b) {
            return a.title.localeCompare(b.title);
          });
          res.send(notes);

        case 5:
        case "end":
          return _context3.stop();
      }
    }
  });
};

var createNote = function createNote(req, res) {
  var user, note;
  return regeneratorRuntime.async(function createNote$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          validateNote(req.body, res);
          _context4.next = 3;
          return regeneratorRuntime.awrap(User.findById(req.user._id));

        case 3:
          user = _context4.sent;
          note = _.pick(req.body, ['title', 'content']);
          user.notes.push(note);
          _context4.next = 8;
          return regeneratorRuntime.awrap(user.save());

        case 8:
          user = _context4.sent;
          res.send(user);

        case 10:
        case "end":
          return _context4.stop();
      }
    }
  });
};

var updateNote = function updateNote(req, res) {
  var user, note;
  return regeneratorRuntime.async(function updateNote$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          validateNote(req.body, res);
          _context5.next = 3;
          return regeneratorRuntime.awrap(User.findById(req.user._id));

        case 3:
          user = _context5.sent;
          note = user.notes.id(req.params.note_id);
          note.title = req.body.title;
          note.content = req.body.content;
          _context5.next = 9;
          return regeneratorRuntime.awrap(user.save());

        case 9:
          res.send(note);

        case 10:
        case "end":
          return _context5.stop();
      }
    }
  });
};

var deleteNote = function deleteNote(req, res) {
  var user, note;
  return regeneratorRuntime.async(function deleteNote$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          _context6.next = 2;
          return regeneratorRuntime.awrap(User.findById(req.user._id));

        case 2:
          user = _context6.sent;
          note = user.notes.id(req.params.note_id);
          _context6.next = 6;
          return regeneratorRuntime.awrap(note.remove());

        case 6:
          _context6.next = 8;
          return regeneratorRuntime.awrap(user.save());

        case 8:
          res.send(note);

        case 9:
        case "end":
          return _context6.stop();
      }
    }
  });
}; //! Exports


module.exports = {
  getCurrentUser: getCurrentUser,
  signupUser: signupUser,
  getCurrentUsersNotes: getCurrentUsersNotes,
  createNote: createNote,
  updateNote: updateNote,
  deleteNote: deleteNote
};