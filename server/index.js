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
    }, (accessToken) => {
      console.log(accessToken);
    }
 ))

// oauth routes
app.get('/auth/google',
  passport.authenticate('google', {
    // request certain permissions
    scope: ['profile', 'email']
  }
))

//default route
app.get('/*', (req, res) => res.send({hi:'there'}))

app.listen(port, () => console.log(`Application listening on port ${port}`))
