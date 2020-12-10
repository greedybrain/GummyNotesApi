const mongoose = require('mongoose')

module.exports = function(config) {
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
}