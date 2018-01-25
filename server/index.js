const express = require('express')
const mongoose = require('mongoose')
const cookieSession = require('cookie-session')
const passport = require('passport')
const { MONGODB_URI, COOKIE_KEY } = require('../config/keys')
const PORT = process.env.port || 4000
require('./models/User')
require('./services')

const app = express()

app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    keys: [COOKIE_KEY] // key used for encryption
  })
)

app.use(passport.initialize())
app.use(passport.session())

require('./routes')(app)

mongoose.connect( MONGODB_URI )

//default route
app.get('/*', (req, res) => res.send({'default':'handler'}))

app.listen(PORT, () => console.log(`Application listening on port ${PORT}`))
