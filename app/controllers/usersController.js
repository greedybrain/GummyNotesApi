//! Packages
const bcrypt = require('bcrypt')
const _ = require('lodash')

//! Custom
const { User, validateUser } = require('../models/user')

const getUser = async (req, res) => {
        const { error } = validateUser(req.body)
        if(error) return res.status(400).send("Invalid email or password")

        let user = await User.findById(req.params.id)
        if (!user) return res.status(400).send("Invalid user")

        user = _.pick(user, ['_id', 'name', 'email'])
        res.send(user)
}

const signupUser = async (req, res) => {
        const { error } = validateUser(req.body)
        if(error) return res.status(400).send(error.message)

        let user = await User.findOne({ email: req.body.email })
        if(user) return res.status(400).send("User already exists!")

        user = new User(_.pick(req.body, ['name', 'email', 'password']))
        const salt = await bcrypt.genSalt(10)
        user.password = await bcrypt.hash(user.password, salt)
        
        try {
                user = await user.save()
                const token = user.generateAuthToken()
                res.header('x-auth-token', token).send(_.pick(user, ['_id', 'name', 'email']))
        } catch (exc) {
                for (field in exc.errors) {
                        console.error(exc.errors[field].message)
                }
        }

}

module.exports = {
        signupUser,
        getUser
}