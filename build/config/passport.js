"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt = require("bcryptjs");
const localStrategy = require("passport-local");
const constants_1 = require("../constants");
const passportJwt = require("passport-jwt");
const passport = require("passport");
const console = require("console");
const User_1 = require("../models/User");
const LocalStrategy = localStrategy.Strategy;
const JwtStrategy = passportJwt.Strategy;
const ExtractJwt = passportJwt.ExtractJwt;
passport.use(new LocalStrategy((username, password, done) => {
    User_1.User.findOne({ username: username }, (err, user) => {
        if (err)
            throw err;
        if (!user)
            return done(null, false);
        bcrypt.compare(password, user.password, (err, result) => {
            if (err)
                throw err;
            if (result === true) {
                return done(null, user);
            }
            else {
                return done(null, false);
            }
        });
    });
}));
passport.serializeUser((req, user, done) => {
    done(undefined, user);
});
passport.deserializeUser((userId, cb) => {
    // Find user in DB
    User_1.User.findOne({ _id: userId }, (err, user) => {
        const userInformation = {
            username: user.username,
        };
        cb(err, userInformation);
    });
});
passport.use(new JwtStrategy({
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: constants_1.JWT_SECRET,
}, function (jwtToken, done) {
    User_1.User.findOne({ _id: jwtToken.id }, function (err, user) {
        console.log(err);
        console.log(user);
        if (err) {
            return done(err, false);
        }
        if (user) {
            return done(undefined, user, jwtToken);
        }
        else {
            return done(undefined, false);
        }
    });
}));
