const express = require('express')
const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy
const app = express()
const port = 4000

// register google oauth with passport
passport.use(new GoogleStrategy())

app.get('/', (req, res) => res.send({hi:'there'}))

app.listen(port, () => console.log(`Application listening on port ${port}`))
