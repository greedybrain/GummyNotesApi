"use strict";

//! Packages 
var Joi = require('joi');

var mongoose = require('mongoose');

var NoteSchema = new mongoose.Schema({
  title: {
    type: String,
    maxlength: 50
  },
  content: {
    type: String,
    maxlength: 250
  },
  color: {
    type: String
  }
}, {
  timestamps: true
});

var validateNote = function validateNote(note) {
  var schema = Joi.object({
    title: Joi.string().max(50),
    content: Joi.string().max(250),
    color: Joi.string()
  });
  return schema.validate(note);
};

module.exports = {
  validateNote: validateNote,
  NoteSchema: NoteSchema
};