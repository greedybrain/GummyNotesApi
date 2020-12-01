//! Custom
const { User } = require('../models/user')

//! Packages
const passport = require('passport');
const _ = require('lodash')
const Joi = require('joi')
const bcrypt = require('bcrypt')

// const loginUser = async (req, res) => {
//         // Check for errors client side
//         const { error } = validate(req.body)
//         if (error) return res.status(400).send(error.message)

//         // Check if user exists and is valid
//         let user = await User.findOne({ email: req.body.email })
//         if(!user) return res.status(400).send("Invalid email or password")

//         /*
//         Use lodash pick method to pick the props we want to use from req.body 
//         Grab the name email password, then check to see if the password matches
//         the hashed version using bcrypt
//         */
//         const isValidPassword = await bcrypt.compare(req.body.password, user.password)
//         if (!isValidPassword) return res.status(400).send("Invalid email or password")

//         const token = user.generateAuthToken()
//         res.header('x-auth-token', token).send({
//                 token,
//                 user: _.pick(user, ['_id', 'name', 'email'])
//         })
// }

const loginUser = async (req, res, next) => {
        const { error } = validate(req.body)
        if (error) return res.status(400).send(error.message)

        passport.authenticate('local', (err, user, info) => {
                if (err) return next(err);
                if (!user) return res.status(400).send("Invalid user")
                req.logIn(user, err => {
                        if (err) return next(err); 
                        user = _.pick(user, ['name', 'email', 'notes'])
                        res.send(user)
                });
        })(req, res, next);
}

const logoutUser = async (req, res) => {
        req.logout()
        req.session.cookie.expires = Date.now()
        res.send('Logged out successfully')
}

//! Validations
const validate = req => {
        const schema = Joi.object({
                email: Joi.string().min(5).max(100).required().email(),
                password: Joi.string().min(8).max(255).required(),
        })
        return schema.validate(req)
}

module.exports = {
        loginUser,
        logoutUser
}