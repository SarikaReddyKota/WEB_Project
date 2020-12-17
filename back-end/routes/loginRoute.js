const express = require("express");
const sampleModel = require("../models/sampleModel.js");
var router = express.Router();
var passport = require("passport");
var session = require('express-session');
var app = express();

router.post("", (req, res) => {
  passport.authenticate("local", function(err, user, info) {
    var token;

    // If Passport throws/catches an error
    if (err) {
      res.status(404).json(err);
      return;
    }

    // If a user is found
    if (user) {

      req.session.name = user._id;
      res.status(200);
      res.json({
        token: req.session.name
      });
    } else {
      // If user is not found
      res.status(401).json(info);
    }
  })(req, res);
});


module.exports = router;
