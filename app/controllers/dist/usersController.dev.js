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


var getUsers = function getUsers(req, res) {
  var users;
  return regeneratorRuntime.async(function getUsers$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(User.find());

        case 2:
          users = _context.sent;
          res.send(users);

        case 4:
        case "end":
          return _context.stop();
      }
    }
  });
};

var getCurrentUser = function getCurrentUser(req, res) {
  var user;
  return regeneratorRuntime.async(function getCurrentUser$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return regeneratorRuntime.awrap(User.findById(req.user._id).select('-password -createdAt -updatedAt -__v'));

        case 2:
          user = _context2.sent;

          if (user) {
            _context2.next = 5;
            break;
          }

          return _context2.abrupt("return", res.status(404).send("User does not exist"));

        case 5:
          user = _.pick(user, ['_id', 'name', 'email', 'notes']);
          res.send(user);

        case 7:
        case "end":
          return _context2.stop();
      }
    }
  });
};

var signupUser = function signupUser(req, res) {
  var _validateUser, error, user, _req$body, password, confirmPassword;

  return regeneratorRuntime.async(function signupUser$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _validateUser = validateUser(req.body), error = _validateUser.error;

          if (!error) {
            _context3.next = 3;
            break;
          }

          return _context3.abrupt("return", res.status(400).send(error.message));

        case 3:
          _context3.next = 5;
          return regeneratorRuntime.awrap(User.findOne({
            email: req.body.email
          }));

        case 5:
          user = _context3.sent;

          if (!user) {
            _context3.next = 8;
            break;
          }

          return _context3.abrupt("return", res.status(400).send("User already exists!"));

        case 8:
          _req$body = req.body, password = _req$body.password, confirmPassword = _req$body.confirmPassword;

          if (!(password !== confirmPassword)) {
            _context3.next = 11;
            break;
          }

          return _context3.abrupt("return", res.status(400).send("Passwords do not match"));

        case 11:
          user = new User(_.pick(req.body, ['_id', 'name', 'email', 'password', 'confirmPassword']));
          _context3.next = 14;
          return regeneratorRuntime.awrap(bcrypt.hash(req.body.password, 10));

        case 14:
          user.password = _context3.sent;
          _context3.next = 17;
          return regeneratorRuntime.awrap(bcrypt.hash(req.body.confirmPassword, 10));

        case 17:
          user.confirmPassword = _context3.sent;
          _context3.next = 20;
          return regeneratorRuntime.awrap(user.save());

        case 20:
          user = _context3.sent;
          req.login(user, function (err) {
            if (err) return res.status(400).send(err);
            res.send(user);
          });

        case 22:
        case "end":
          return _context3.stop();
      }
    }
  });
};

var getCurrentUsersNotes = function getCurrentUsersNotes(req, res) {
  var user, notes;
  return regeneratorRuntime.async(function getCurrentUsersNotes$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.next = 2;
          return regeneratorRuntime.awrap(User.findById(req.user._id).select('-password'));

        case 2:
          user = _context4.sent;
          notes = user.notes.sort(function (a, b) {
            return a.title.localeCompare(b.title);
          });
          res.send(notes);

        case 5:
        case "end":
          return _context4.stop();
      }
    }
  });
};

var createNote = function createNote(req, res) {
  var _validateNote, error, user, note;

  return regeneratorRuntime.async(function createNote$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _validateNote = validateNote(req.body), error = _validateNote.error;

          if (!error) {
            _context5.next = 3;
            break;
          }

          return _context5.abrupt("return", res.status(400).send("Check the title, body content, or color of your note"));

        case 3:
          _context5.next = 5;
          return regeneratorRuntime.awrap(User.findById(req.user._id));

        case 5:
          user = _context5.sent;
          note = _.pick(req.body, ['title', 'content', 'color']);
          user.notes.push(note);
          _context5.next = 10;
          return regeneratorRuntime.awrap(user.save());

        case 10:
          user = _context5.sent;
          res.send(user.notes.slice(-1)[0]);

        case 12:
        case "end":
          return _context5.stop();
      }
    }
  });
};

var updateNote = function updateNote(req, res) {
  var user, note;
  return regeneratorRuntime.async(function updateNote$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          // const { error } = validateNote(req.body)
          // if (error) return res.status(400).send("Check the title, body content, or color of your note")
          console.log(req.body);
          _context6.next = 3;
          return regeneratorRuntime.awrap(User.findById(req.user._id));

        case 3:
          user = _context6.sent;
          note = user.notes.id(req.params.note_id);
          note.title = req.body.title;
          note.content = req.body.content;
          note.color = req.body.color;
          console.log(note);
          _context6.next = 11;
          return regeneratorRuntime.awrap(user.save());

        case 11:
          res.send(note);

        case 12:
        case "end":
          return _context6.stop();
      }
    }
  });
};

var deleteNote = function deleteNote(req, res) {
  var user, note;
  return regeneratorRuntime.async(function deleteNote$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          _context7.next = 2;
          return regeneratorRuntime.awrap(User.findById(req.user._id));

        case 2:
          user = _context7.sent;
          note = user.notes.id(req.params.note_id);
          _context7.next = 6;
          return regeneratorRuntime.awrap(note.remove());

        case 6:
          _context7.next = 8;
          return regeneratorRuntime.awrap(user.save());

        case 8:
          res.send(note);

        case 9:
        case "end":
          return _context7.stop();
      }
    }
  });
}; //! Exports


module.exports = {
  getCurrentUser: getCurrentUser,
  getUsers: getUsers,
  signupUser: signupUser,
  getCurrentUsersNotes: getCurrentUsersNotes,
  createNote: createNote,
  updateNote: updateNote,
  deleteNote: deleteNote
};