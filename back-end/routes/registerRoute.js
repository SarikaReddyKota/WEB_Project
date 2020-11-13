const express = require("express");
const registerModel = require("../models/registerModel.js");
var bcrypt = require("bcryptjs");
const app = express();

app.post("/", async (req, res) => {
  //console.log("Hitting here in register......", req.body);
  const newUser = new registerModel({
    email: req.body.email,
    username: req.body.username,
    password: req.body.password
  });

  registerModel.findOne( { $or:[ {username: req.body.username}, {email: req.body.email}]} ).then(user => {
    if (user) {
      //console.log('userNae exists', user);
      res.status(500).json("UserName already exists");
      //res.send("UserName already exists");
    } else {
      bcrypt.genSalt(10, (err, salt) =>
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          //console.log('before hashing.......', newUser.password);
          newUser.password = hash;
          
          //console.log('after hashing.......', newUser.password);
          // const saveUser = new registerModel(newUser);
        //   newUser.save(err => {
        //     //if (err) return res.sendStatus(500).send(err);
        //     return res.sendStatus(200).send(req.body);
        // });
//          res.send("User registered");
          newUser.save();
         // res.send(req.body.username);
          res.status(200).json(req.body.username);
        })
      );

      // .then(res => res.send('User registered'))
      // .catch(err => res.sendStatus(500));
    }
  });

});

module.exports = app;
