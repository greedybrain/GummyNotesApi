//! Packages
require('express-async-errors')
const config = require('config')
const mongoose = require('mongoose')
const express = require('express')
const app = express()

//! Custom 
// const { handleErrors } = require('./app/middleware/error')
const auth = require('./app/routes/auths')
const users = require('./app/routes/users')


if (!config.get('jwtPrivateKey')) {
        console.log("FATAL ERROR: jwtPrivateKey is not defined.")
        process.exit(1)
}

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
app.use('/api/auth', auth)
app.use('/api/users', users)
// app.use(handleErrors)

//! Listening 
const PORT = process.env.PORT || 3001
app.listen(PORT, error => {
        if(error) console.error(error)       
        console.log(`Listening on PORT ${PORT}`)
})
