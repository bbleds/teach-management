const passport = require('passport')

module.exports = app => {
  // oauth routes
  app.get('/auth/google',
    passport.authenticate('google', {
      // request certain permissions
      scope: ['profile', 'email']
    }
  ))

  // get requested google profile information
  app.get('/auth/google/callback', passport.authenticate('google'))
}
