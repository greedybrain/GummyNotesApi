//! Packages
const bcrypt = require('bcrypt')
const _ = require('lodash')

//! Custom
const { User, validateUser } = require('../models/user')
const { validateNote } = require('../models/note')


const getCurrentUser = async (req, res) => {
        try {
                const user = await User.findById(req.user._id) .select('-password -createdAt -updatedAt -__v')
                if (!user) return res.status(404).send("User does not exist")
                res.send(user)
        } catch(exc) {
                console.log(exc.message)
        }
}

const signupUser = async (req, res) => {
        const { error } = validateUser(req.body)
        if(error) return res.status(400).send(error.message)

        let user = await User.findOne({ email: req.body.email })
        if(user) return res.status(400).send("User already exists!")

        user = new User(_.pick(req.body, ['name', 'email', 'password']))
        const salt = await bcrypt.genSalt(10)
        user.password = await bcrypt.hash(user.password, salt)
        
        try {
                user = await user.save()
                const token = user.generateAuthToken()
                res.header('x-auth-token', token).send(_.pick(user, ['_id', 'name', 'email']))
        } catch (exc) {
                for (field in exc.errors) {
                        console.error(exc.errors[field].message)
                }
        }
}

const getCurrentUsersNotes = async (req, res) => {
        const user = await User.findById(req.user._id).select('-password')

        const notes = user.notes.sort((a, b) => a.title.localeCompare(b.title))
        res.send(notes)
}

const createNote = async (req, res) => {
        const { error } = validateNote(req.body)
        if (error) return res.status(400).send("Check the title or body content of your note")

        let user = await User.findById(req.user._id)
        user.notes.push(_.pick(req.body, ['title', 'content']))
        try {
                user = await user.save()
                res.send(user)
        } catch (exc) {
                for (field in exc.errors) console.error(exc.errors[field].message)
        }
}

const updateNote = async (req, res) => {
        const { error } = validateNote(req.body)
        if (error) return res.status(400).send("Check the title or body content of your note")

        const user = await User.findById(req.user._id)
        let note = user.notes.id(req.params.note_id)
        note.title = req.body.title 
        note.content = req.body.content 
        try {
                await user.save()
                res.send(note)
        } catch (error) {
                console.log(error)
        }
}

const deleteNote = async (req, res) => {
        const user = await User.findById(req.user._id)
        const note = user.notes.id(req.params.note_id)
        try {
                await note.remove()
                await user.save()
                res.send(note)
        } catch (error) {
                console.log(error)
        }
}

//! Exports
module.exports = {
        getCurrentUser,
        signupUser,
        getCurrentUsersNotes,
        createNote,
        updateNote,
        deleteNote,
}