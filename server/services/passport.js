const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy
const mongoose = require('mongoose')
const keys = require('../../config/keys')

const User = mongoose.model('users')

passport.serializeUser((user, done) => {
  console.log('serialize', user);
  done(null, user.id)
})

passport.deserializeUser((userID, done) => {
  console.log('deserialize', userID);
  User
    .findById(userID)
    .then((user) => {
      done(null, user)
    })
})


// register google oauth with passport and specify callback url
passport.use(
  new GoogleStrategy(
    {
      clientID: keys.GOOGLE_CLIENT_ID,
      clientSecret: keys.GOOGLE_CLIENT_SECRET,
      callbackURL: keys.GOOGLE_CALLBACK_URL
    }, (accessToken, refreshToken, profile, done) => {

      // check if this user exists
      User
        .findOne({googleID:profile.id})
        .then( existingUser => {

          !existingUser ?
            //  create new user, then continue auth flow
            new User({
              googleID : profile.id,
              firstName: profile.name.givenName,
              lastName: profile.name.familyName,
              knownEmails: profile.emails,
              rawInitialCreationResponse: profile._raw
            })
            .save()
            .then((user) => {
              done(null, user)
            })
            .catch(err => console.log('An error occurred in auth flow',err) ) :

            // user exists, continue auth flow
            done(null, existingUser)
        })
        .catch(err => console.log('an error occurred in auth flow',err) )
    }))
