import * as passport from 'passport';
import passportGoogle from 'passport-google-oauth20';

const GoogleStrategy = passportGoogle.Strategy;

const GOOGLE_CLIENT_ID ="1028096197089-381fum8mo1ugh2625n7f1v03fgpjrosl.apps.googleusercontent.com";
const GOOGLE_CLIENT_SECRET ="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";

passport.serializeUser<any, any>((req, user, done) => {
  done(undefined, user);
});

passport.deserializeUser((userId, cb) => {
  // Find user in DB
});


passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: 'https://www.example.com/oauth2/redirect/google',
    scope: [ 'profile' ],
    passReqToCallback: true
  },
  function verify(accessToken, refreshToken, profile, cb) {
    // DB functions to find or create user
  }
));
