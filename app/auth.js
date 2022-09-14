const passport = require('passport');

var GoogleStrategy = require( 'passport-google-oauth2' ).Strategy;

passport.use(new GoogleStrategy({
    clientID:     '105335778076-jnooc7v9dqqo858ap8sgufdd4618745m.apps.googleusercontent.com',
    clientSecret: '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',
    callbackURL: "http://localhost:4000/google/callback",
    passReqToCallback   : true
  },
  function(request, accessToken, refreshToken, profile, done) {
      return done(null, profile);
  
  }
));

passport.serializeUser(function (user, done) {
    done(null, user);
})

passport.deserializeUser(function (user, done) {
    done(null, user);
})