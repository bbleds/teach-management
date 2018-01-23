const passport = require('passport')

module.exports = app => {
  // google oauth
  app.get('/auth/google',
    passport.authenticate('google', {
      // request certain permissions
      scope: ['profile', 'email']
    }
  ))

  // get requested google profile information
  app.get('/auth/google/callback', passport.authenticate('google'))

  app.get('/api/current_user', (req, res) => {
    res.send(req.user)
  })

  app.get('/api/logout', (req, res) => {
    // log out using passport logout method that is attached to req
    req.logout()
    res.send(req.user)
  })
}
