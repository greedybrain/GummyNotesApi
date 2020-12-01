"use strict";

// const jwt = require('jsonwebtoken')
// const config = require('config')
// const ifAuthorized = (req, res, next) => {
//         const token = req.header('x-auth-token')
//         if(!token) return res.status(401).send("Access denied. No token provided")
//         try {
//                 const decodedPayload = jwt.verify(token, config.get('jwtPrivateKey'))
//                 req.user = decodedPayload
//                 next()
//         } catch (error) {
//                 res.status(400).send("Invalid token")
//         }
// }
var ifAuthorized = function ifAuthorized(req, res, next) {
  if (!req.isAuthenticated()) return res.status(400).send("You must be logged in to do that");
  return next();
};

module.exports = {
  ifAuthorized: ifAuthorized
};