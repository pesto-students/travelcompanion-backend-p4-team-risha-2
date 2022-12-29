const passport = require('passport');
const GoogleStrategy = require('passport.google.oauth20').Strategy;

const GOOGLE_CLIENT_ID ="1028096197089-381fum8mo1ugh2625n7f1v03fgpjrosl.apps.googleusercontent.com";
const GOOGLE_CLIENT_SECRET ="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";

passport.use(new GoogleStrategy({
  clientID: GOOGLE_CLIENT_ID,
  clientSecret: GOOGLE_CLIENT_SECRET,
  callbackURL:"/auth/google/callback"

},
function(accessToken, refreshToken,profile,done) {
    
    done(null,profile);
}

));

passport.serializeUser(()=>{

    done(null,user)
})

passport.deserializeUser((user,done)=>{
    done(null,user)
})