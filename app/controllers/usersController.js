//! Packages
const bcrypt = require('bcrypt')
const _ = require('lodash')

//! Custom
const { User, validateUser } = require('../models/user')
const { validateNote } = require('../models/note')

//! handle errors
// const asyncMiddleware = handler => {
//         return async (req, res, next) => {
//                 try {
//                         await handler(req, res)
//                 } catch (exc) {
//                         next(exc)
//                 }
//         }
// } => then wrap each 'route/action' in this ^ method

const getCurrentUser = async (req, res) => {
        const user = await User.findById(req.user._id) .select('-password -createdAt -updatedAt -__v')
        if (!user) return res.status(404).send("User does not exist")
        res.send(user)
}

const signupUser = async (req, res) => {
        validateUser(req.body, res)
        
        let user = await User.findOne({ email: req.body.email })
        if(user) return res.status(400).send("User already exists!")

        user = new User(_.pick(req.body, ['name', 'email', 'password']))
        const salt = await bcrypt.genSalt(10)
        user.password = await bcrypt.hash(user.password, salt)

        user = await user.save()
        const token = user.generateAuthToken()
        res.header('x-auth-token', token).send(_.pick(user, ['_id', 'name', 'email']))
}

const getCurrentUsersNotes = async (req, res) => {
        const user = await User.findById(req.user._id).select('-password')
        const notes = user.notes.sort((a, b) => a.title.localeCompare(b.title))
        res.send(notes)
}


const createNote = async (req, res) => {
        validateNote(req.body, res)

        let user = await User.findById(req.user._id)
        const note = _.pick(req.body, ['title', 'content'])
        user.notes.push(note)

        user = await user.save()
        res.send(user)
}


const updateNote = async (req, res) => {
        validateNote(req.body, res)
        
        const user = await User.findById(req.user._id)
        const note = user.notes.id(req.params.note_id)
        note.title = req.body.title 
        note.content = req.body.content 

        await user.save()
        res.send(note)
}


const deleteNote = async (req, res) => {
        const user = await User.findById(req.user._id)
        const note = user.notes.id(req.params.note_id)

        await note.remove()
        await user.save()
        res.send(note)
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