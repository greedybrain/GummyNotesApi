const auth = require('../app/routes/auths')
const users = require('../app/routes/users');
const session = require('express-session');
const cors = require('cors');
const mongoose = require('mongoose');
const MongoStore = require('connect-mongo')(session);

module.exports = function(app, express, config, passport) {
        app.use(express.json())
        app.use(express.urlencoded({ extended: true }))
        app.use('/api/v1/auth', auth)
        app.use('/api/v1/users', users)

        app.use(cors({
                origin: 'https://gifted-dubinsky-612231.netlify.app', // react connection,
                credentials: true
        }))
        app.use(session({
                secret: config.get("sessionKey"),
                store: new MongoStore({ mongooseConnection: mongoose.connection }),
                resave: true,
                saveUninitialized: true,
        }))
        
        app.use(passport.initialize());
        app.use(passport.session());
}
