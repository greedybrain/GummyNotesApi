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

//! Helper functions
const getUsers = async (req, res) => {
        let users = await User.find()
        res.send(users)
}

const getCurrentUser = async (req, res) => {
        let user = await User.findById(req.user._id) .select('-password -createdAt -updatedAt -__v')
        if (!user) return res.status(404).send("User does not exist")

        user = _.pick(user, ['_id', 'name', 'email', 'notes'])

        res.send(user)
}

const signupUser = async (req, res) => {
        const { error } = validateUser(req.body)
        if(error) return res.status(400).send(error.message)

        let user = await User.findOne({ email: req.body.email })
        if(user) return res.status(400).send("User already exists!")

        const { password, confirmPassword } = req.body
        if (password !== confirmPassword) return res.status(400).send("Passwords do not match")

        user = new User(_.pick(req.body, ['_id', 'name', 'email', 'password', 'confirmPassword']))
        user.password = await bcrypt.hash(req.body.password, 10)
        user.confirmPassword = await bcrypt.hash(req.body.confirmPassword, 10)
        user = await user.save()

        req.login(user, err => {
                if (err) return res.status(400).send(err)
                res.send(user)
        })
}

const getCurrentUsersNotes = async (req, res) => {
        const user = await User.findById(req.user._id).select('-password')
        const notes = user.notes.sort((a, b) => a.title.localeCompare(b.title))
        res.send(notes)
}

const createNote = async (req, res) => {
        const { error } = validateNote(req.body)
        if (error) return res.status(400).send("Check the title, body content, or color of your note")

        let user = await User.findById(req.user._id)
        const note = _.pick(req.body, ['title', 'content', 'color'])
        
        user.notes.push(note)

        user = await user.save()
        res.send(user.notes.slice(-1)[0])
}

const updateNote = async (req, res) => {
        // const { error } = validateNote(req.body)
        // if (error) return res.status(400).send("Check the title, body content, or color of your note")
        console.log(req.body)
        
        const user = await User.findById(req.user._id)
        const note = user.notes.id(req.params.note_id)
        note.title = req.body.title 
        note.content = req.body.content 
        note.color = req.body.color
        console.log(note)

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
        getUsers,
        signupUser,
        getCurrentUsersNotes,
        createNote,
        updateNote,
        deleteNote,
}