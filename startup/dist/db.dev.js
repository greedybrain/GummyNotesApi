"use strict";

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var mongoose = require('mongoose');

module.exports = function (config) {
  var _mongoose$connect;

  var connectionString = config.get('db');
  mongoose.connect(connectionString, (_mongoose$connect = {
    useFindAndModify: true,
    useUnifiedTopology: true
  }, _defineProperty(_mongoose$connect, "useFindAndModify", false), _defineProperty(_mongoose$connect, "useNewUrlParser", true), _defineProperty(_mongoose$connect, "useCreateIndex", true), _mongoose$connect)).then(function () {
    return console.log("Connected to database");
  })["catch"](function (err) {
    return console.log(err.message);
  });
};