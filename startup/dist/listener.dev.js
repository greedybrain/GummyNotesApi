"use strict";

module.exports = function (app) {
  var PORT = process.env.PORT || 5000;
  app.listen(PORT, function (error) {
    if (error) console.error(error);
    console.log("Listening on PORT ".concat(PORT));
  });
};