var LocalStrategy = require('passport-local').Strategy;
var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

var User = require('../models/registerModel');


module.exports = function(passport) {
    passport.use(
        new LocalStrategy({ userNameField: 'username'}, (username, password, done) => {
            User.findOne({ username : username})
            .then( res => {
                //console.log('This is hitting in passport.js file@@@@@@@@@@@@',password);
                if (!res) {
                    // res.send('Username is not registered.');
                    return done(null, false, {message: 'Username is not registered.'});
                } 

                bcrypt.compare(password, res.password, (err, isMatch) => {
                    if(err) throw err;

                    if(isMatch) {
                        // return res.send('User is authorised......');
                        //console.log('Password is matched.....');
                        return done(null, res);
                    } else {
                        // return res.send("Password is incorrect");
                        //console.log('Password is incorrect');
                        return done(null, false, { message: 'Password is incorrect.'});
                    }
                })
            })
            .catch(err => console.log(err))
        })
    );


    passport.serializeUser((user, done) => {
        done(null, user.id);
      });
      
      passport.deserializeUser((id, done) => {
        User.findById(id, (err, user) => {
          done(err, user);
        });
      });
}