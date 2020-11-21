const { User }  = require('../../../models/user');
const jwt = require('jsonwebtoken');
const config = require('config');
const mongoose = require('mongoose');
const _ = require('lodash')

//! Test sweet
describe('user.generateToken()', () => {
        it('should return a valid token', () => {
                const payload = { 
                        _id: new mongoose.Types.ObjectId(), 
                        isAdmin: true 
                }
                let user = new User(payload)
                const token = user.generateAuthToken()
                const decoded = jwt.verify(token, config.get('jwtPrivateKey'))
                console.log(`Decoded Token: ${decoded}`)
                console.log(`Payload: ${payload}`)
                expect(decoded).toMatchObject(_.pick(payload, ['_id', 'isAdmin']))
        });
});