const mongoose = require('mongoose')
const { Schema } = mongoose

const userSchema = new Schema({
  googleID : String,
  firstName: String,
  lastName: String,
  knownEmails: Array,
  rawInitialCreationResponse: String
})

mongoose.model('users', userSchema)
