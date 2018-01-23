const express = require('express')
const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy
const keys = require('../config/keys')
const app = express()
const port = 4000


// register google oauth with passport and specify callback url
passport.use(
  new GoogleStrategy(
    {
      clientID: keys.GOOGLE_CLIENT_ID,
      clientSecret: keys.GOOGLE_CLIENT_SECRET,
      callbackURL: keys.GOOGLE_CALLBACK_URL
    }, (accessToken, refreshToken, profile, done) => {
      console.log('access token', accessToken);
      console.log('refresh token', refreshToken);
      console.log('profile', profile);

    }
 ))

// oauth routes
app.get('/auth/google',
  passport.authenticate('google', {
    // request certain permissions
    scope: ['profile', 'email']
  }
))

// get requested google profile information
app.get('/auth/google/callback', passport.authenticate('google'))

//default route
app.get('/*', (req, res) => res.send({hi:'there'}))

app.listen(port, () => console.log(`Application listening on port ${port}`))
