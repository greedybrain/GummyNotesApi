module.exports = function(app) {
        const PORT = process.env.PORT || 5000
        app.listen(PORT, error => {
                if(error) console.error(error)       
                console.log(`Listening on PORT ${PORT}`)
        })
}