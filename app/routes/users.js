//! Packages
const express = require('express')
const userRouter = express.Router()

//! Custom
const { 
        signupUser, 
        getUsers,
        getCurrentUser, 
        getCurrentUsersNotes, 
        createNote,
        updateNote,
        deleteNote,
} = require('../controllers/usersController')
const { ifAuthorized } = require('../middleware/auth')

//! Define routes
userRouter.get('/', async (req, res) => await getUsers(req, res))
userRouter.get('/me', ifAuthorized, async (req, res) => await getCurrentUser(req, res))
userRouter.post('/', async (req, res) => await signupUser(req, res))
userRouter.get('/:id/notes', ifAuthorized, async (req, res) => await getCurrentUsersNotes(req, res))
userRouter.post('/:id/notes', ifAuthorized, async (req, res) => await createNote(req, res))
userRouter.patch('/:user_id/notes/:note_id', ifAuthorized, async (req, res) => await updateNote(req, res))
userRouter.delete('/:user_id/notes/:note_id', ifAuthorized, async (req, res) => await deleteNote(req, res))

//! Exporting 
module.exports = userRouter