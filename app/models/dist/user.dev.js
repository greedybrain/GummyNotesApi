"use strict";

//! Packages
var config = require('config');

var _ = require('lodash');

var jwt = require('jsonwebtoken');

var Joi = require('joi');

var mongoose = require('mongoose'); //! Custom


var _require = require('../models/note'),
    NoteSchema = _require.NoteSchema;

var UserSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 100,
    required: true
  },
  email: {
    type: String,
    minlength: 5,
    maxlength: 100,
    required: true,
    unique: true
  },
  password: {
    type: String,
    minlength: 8,
    required: true
  },
  confirmPassword: {
    type: String,
    minlength: 8,
    required: true
  },
  notes: {
    type: [NoteSchema]
  }
}, {
  timestamps: true
}); // UserSchema.methods.generateAuthToken = function () {
//         const token = jwt.sign(_.pick(this, ['_id', 'name', 'email']), config.get('jwtPrivateKey'))
//         return token
// }       

var User = mongoose.model('User', UserSchema);

var validateUser = function validateUser(user) {
  var schema = Joi.object({
    name: Joi.string().min(2).max(100).required(),
    email: Joi.string().min(5).max(100).email().required(),
    password: Joi.string().min(8).required(),
    confirmPassword: Joi.string().min(8).required()
  });
  return schema.validate(user);
};

module.exports = {
  User: User,
  UserSchema: UserSchema,
  validateUser: validateUser
};