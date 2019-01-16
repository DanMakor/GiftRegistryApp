import passport from 'passport'
import LocalStrategy from 'passport-local';
import mongoose from 'mongoose';
import User from '../models/User';

passport.use(new LocalStrategy({
    usernameField: 'name',
    passwordField: 'name'
},
  function(username, password, done) {
    User.findOne({ name: username }, function (err, user) {
      if (err) { return done(err); }
      // Return if user not found in database
      if (!user) {
        return done(null, false, {
          message: 'User not found'
        });
      }
      // If credentials are correct, return the user object
      return done(null, user);
    });
  }
));