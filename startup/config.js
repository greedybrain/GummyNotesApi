const auth = require('../app/routes/auths')
const users = require('../app/routes/users');
const session = require('express-session');
const cors = require('cors');

module.exports = function(app, express, config, passport) {
        app.use(express.json())
        app.use(express.urlencoded({ extended: true }))
        app.use('/api/v1/auth', auth)
        app.use('/api/v1/users', users)

        app.use(cors({
                origin: 'http://localhost:3000', // react connection,
                credentials: true
        }))
        app.use(session({
                secret: config.get("sessionKey"),
                resave: true,
                saveUninitialized: true,
        }))
        
        app.use(passport.initialize());
        app.use(passport.session());
}