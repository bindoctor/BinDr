const express = require('express')
const expressHandlebars = require('express-handlebars')
const app = express()
const sampleData = require('./sampleData')
const bin = require('./models/bin')

app.engine('handlebars', expressHandlebars({defaultLayout: 'main'}))
app.set('view engine', 'handlebars')


app.get('/', (request, response) => {
  response.render('home')
})

app.get('/about', (request, response) => {
  response.render('about')
})

app.get('/api/sample-bins', (request, response) => {
  const binJson = {
    type: 'Feature',
    properties: {},
    geometry: {
      type: 'Point',
      coordinates: [
        -0.0996708869934082,
        51.52560021903987,
      ],
    },
  }

  const newBin = new bin(binJson)
  newBin.save()
  response.json(sampleData)
})

module.exports = app
