const express = require('express')
const mongoose = require('mongoose')
const keys = require('../config/keys')
const app = express()
const PORT = process.env.port || 4000

mongoose.connect( keys.MONGODB_URI )

require('./services')
require('./routes')(app)

//default route
app.get('/*', (req, res) => res.send({hi:'there'}))

app.listen(PORT, () => console.log(`Application listening on port ${PORT}`))
