//! Packages 
const Joi = require('joi');
const mongoose = require('mongoose');

const NoteSchema = new mongoose.Schema({
        title: {
                type: String,
                maxlength: 50,
        },
        content: {
                type: String,
                maxlength: 250,
        },
        color: {
                type: String,
        }
}, { timestamps: true })

const validateNote = note => {
        const schema = Joi.object({
                title: Joi.string().max(50),
                content: Joi.string().max(250),
                color: Joi.string()
        })

        return schema.validate(note)
}

module.exports = {
        validateNote,
        NoteSchema
}