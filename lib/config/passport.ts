import * as bcrypt from 'bcryptjs'
import * as localStrategy from 'passport-local'
import {JWT_SECRET} from "../constants";
import * as passportJwt from 'passport-jwt'
import * as passport from "passport";
import * as console from "console";
import {User} from "../models/User";

const LocalStrategy = localStrategy.Strategy
const JwtStrategy = passportJwt.Strategy
const ExtractJwt = passportJwt.ExtractJwt

passport.use(
  new LocalStrategy((username, password, done) => {
    User.findOne({username: username}, (err, user) => {
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
  User.findOne({_id: userId}, (err, user) => {
    const userInformation = {
      username: user.username,
    };
    cb(err, userInformation);
  });
});

passport.use(
  new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: JWT_SECRET,
    },
    function (jwtToken, done) {
      User.findOne({_id: jwtToken.id}, function (err, user) {
        console.log(err);
        console.log(user);
        if (err) {
          return done(err, false)
        }
        if (user) {
          return done(undefined, user, jwtToken)
        } else {
          return done(undefined, false)
        }
      })
    }
  )
)




