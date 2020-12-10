const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt')

// Load user model
const { User } = require('../models/user');

module.exports = function(passport) {
        passport.use( 
                new LocalStrategy({ 
                        usernameField: 'email' ,
                        passwordField: 'password'
                }, async (email, password, done) => {
                        await User.findOne({ email }, (err, user) => {
                                if (err) return done(err)
                                if (!user) return done(null, false, { message: "Email not registered" })

                                bcrypt.compare(password, user.password, (err, isMatch) => {
                                        if (err) return done(err)
                                        if (!isMatch) return done(null, false)
                                        done(null, user)
                                })
                        })
                }
        ))
        passport.serializeUser((user, done) => done(null, user.id))
        passport.deserializeUser(async (id, done) => await User.findOne({ _id: id }, (err, user) => done(err, user)))
}