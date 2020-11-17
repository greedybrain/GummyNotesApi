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
        },
}, { timestamps: true })

const validateNote = (note, res) => {
        const schema = Joi.object({
                title: Joi.string().max(50).required(),
                content: Joi.string().max(250).required(),
        })
        const { error } = schema.validate(note)
        if (error) return res.status(400).send("Check the title or body content of your note")
}

module.exports = {
        validateNote,
        NoteSchema
}