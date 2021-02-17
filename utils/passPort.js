const LocalStrategy = require('passport-local').Strategy;
// const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// load user model
const User = require('../models/User');

module.exports = function (passport){
   passport.use(
      new LocalStrategy({ usernameField: 'email' },
         (email, password, done) => {
            // console.log(email, password, done);
            User.findOne({ login: email }).select('+password')
            .then(user =>{
               console.log(user);
               if (!user) {
                  return done(null, false, { message: 'datos incorrectos'});
               }
               // console.log(password, user.password);
               bcrypt.compare(password, user.password,
                  (err, match)=>{
                     if(err) throw err;
                     if (match) {
                        return done(null, user);
                     } else {
                        done(null, false, {message: 'datos incorrectos!'});
                     }
                  });
            })
            .catch(err => {
               console.log(err);
            })
         }
      )
   ); // passport.use
   passport.serializeUser((user, done)=>{
      done(null, user.id);
   });
   passport.deserializeUser( (id, done)=>{
      User.findById(id, (err, user)=>{
         done(err, user);
      });
   });
} // ends
