import * as passport from 'passport';
import * as bcrypt from 'bcryptjs'
import User from '../models/user'
// import passportGoogle from 'passport-google-oauth20';
import * as localStrategy from 'passport-local'
// import { Request, Response } from "express";cls
const LocalStrategy = localStrategy.Strategy

// const GoogleStrategy = passportGoogle.Strategy;

// const GOOGLE_CLIENT_ID ="1028096197089-381fum8mo1ugh2625n7f1v03fgpjrosl.apps.googleusercontent.com";
// const GOOGLE_CLIENT_SECRET ="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";
module.exports = function (passport) {

  passport.use(
    new LocalStrategy((username, password, done) => {
      User.findOne({ username: username }, (err, user) => {
        if (err) throw err;
        if (!user) return done(null, false);
        bcrypt.compare(password, user.password, (err, result) => {
          if (err) throw err;
          if (result === true) {
            return done(null, user);
          } else {
            return done(null, false);
          } 
        });
      });
    })
  );
  
  passport.serializeUser((req, user, done) => {
    done(undefined, user);
  });
  
  passport.deserializeUser((userId, cb) => {
    // Find user in DB
    User.findOne({ _id: userId }, (err, user) => {
      const userInformation = {
        username: user.username,
      };
      cb(err, userInformation);
    });
  });
  
}


// passport.use(new GoogleStrategy({
//     clientID: GOOGLE_CLIENT_ID,
//     clientSecret: GOOGLE_CLIENT_SECRET,
//     callbackURL: 'https://www.example.com/oauth2/redirect/google',
//     scope: [ 'profile' ],
//     passReqToCallback: true
//   },
//   function verify(accessToken, refreshToken, profile, cb) {
//     // DB functions to find or create user
//   }
// ));




