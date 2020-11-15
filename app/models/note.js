//! Packages 
const Joi = require('joi');
const mongoose = require('mongoose');

const NoteSchema = new mongoose.Schema({
        title: {
                type: String,
                maxlength: 50,
                required: true
        },
        content: {
                type: String,
                maxlength: 250,
                required: true
        }
}, { timestamps: true })

const Note = mongoose.model('Note', NoteSchema)

const validateNote = note => {
        const schema = Joi.object({
                title: Joi.string().max(50).required(),
                content: Joi.string().max(250).required(),
        })
        return schema.validate(note)
}

module.exports = {
        Note,
        validateNote
}