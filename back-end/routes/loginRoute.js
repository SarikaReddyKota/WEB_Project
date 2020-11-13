const express = require("express");
const sampleModel = require("../models/sampleModel.js");
var router = express.Router();
var passport = require("passport");
var session = require('express-session');
var app = express();

// router.post('',
//   passport.authenticate('local'),
//   function(req, res) {
//     // If this function gets called, authentication was successful.
//     // `req.user` contains the authenticated user.
//     // res.send('Login Success....', req.res);
//     console.log('This is logged inside the login function.......', req);
//     res.send(req.user);

//   });

router.post("", (req, res) => {
  //console.log('hitting in login@@@@@@');
  passport.authenticate("local", function(err, user, info) {
    var token;

    // If Passport throws/catches an error
    if (err) {
      res.status(404).json(err);
      return;
    }

    // If a user is found
    if (user) {
      //token = user.generateJwt();
      
      // app.set("trust proxy", 1); // trust first proxy
      // app.use(
      //   session({
      //     secret: "keyboard cat",
      //     resave: false,
      //     saveUninitialized: true,
      //     cookie: { secure: true }
      //   })
      // );

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

// module.exports.login = function(req, res) {

//   passport.authenticate('local', function(err, user, info){
//     var token;

//     // If Passport throws/catches an error
//     if (err) {
//       res.status(404).json(err);
//       return;
//     }

//     // If a user is found
//     if(user){
//       token = user.generateJwt();
//       res.status(200);
//       res.json({
//         "token" : token
//       });
//     } else {
//       // If user is not found
//       res.status(401).json(info);
//     }
//   })(req, res);

// };

module.exports = router;
