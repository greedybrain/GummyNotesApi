//! Packages
require('express-async-errors')
const config = require('config')
const mongoose = require('mongoose')
const cors = require('cors');
const passport = require('passport');
// const cookieParser = require('cookie-parser');
const session = require('express-session');
const express = require('express')

const app = express()

//! Custom 
// const { handleErrors } = require('./app/middleware/error')
const { configuredLocalStrategy } = require('./config/passportConfig');
configuredLocalStrategy(passport)
const auth = require('./app/routes/auths')
const users = require('./app/routes/users');


// if (!config.get('jwtPrivateKey')) {
//         console.log("FATAL ERROR: jwtPrivateKey is not defined.")
//         process.exit(1)
// }

//! Connecting to database
const connectionString = config.get('connection_string')
mongoose.connect(connectionString, {
        useFindAndModify: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useNewUrlParser: true,
        useCreateIndex: true
})
        .then(() => console.log("Connected to database"))
        .catch(err => console.log(err.message))

//! Add middleware 
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(cors({
        origin: 'http://localhost:3000', // react connection,
        credentials: true
}))
app.use(session({
        secret: "secret",
        resave: true,
        saveUninitialized: true,
}))

app.use(passport.initialize());
app.use(passport.session());

app.use('/api/v1/auth', auth)
app.use('/api/v1/users', users)
// app.use(handleErrors)

//! Listening 
const PORT = 5000
app.listen(PORT, error => {
        if(error) console.error(error)       
        console.log(`Listening on PORT ${PORT}`)
})
