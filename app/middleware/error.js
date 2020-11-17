const handleErrors = (err, req, res, next) => {
        res.status(500).send("Something went wrong/failed")
}

module.exports = {
        handleErrors
}