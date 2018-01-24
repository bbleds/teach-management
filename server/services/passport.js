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
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // if no existing user is found, we should create one and then continue auth flow
        const existingUser = await User.findOne({googleID:profile.id})

        if(existingUser) return done(null, existingUser)

        const newUser = await new User({
          googleID : profile.id,
          firstName: profile.name.givenName,
          lastName: profile.name.familyName,
          knownEmails: profile.emails,
          rawInitialCreationResponse: profile._raw
        }).save()

        done(null, newUser)
      }
      catch(error) {
        console.log('an error occurred during auth', error)
      }
}))
