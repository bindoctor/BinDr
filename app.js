const express = require('express');
const expressHandlebars = require('express-handlebars');
const app = express();
const morgan = require('morgan');
const sampleData = require('./sampleData');
const Bin = require('./models/bin');

app.engine('handlebars', expressHandlebars({
  defaultLayout: 'main',
  helpers: {
    googleKey: function () {
      return process.env.GOOGLE_KEY;
    }
  }
}));

app.set('view engine', 'handlebars');

if (app.get('env') !== 'test') {
  app.use(morgan('dev'));
}

app.get('/', (request, response) => {
  response.render('home');
});

app.get('/about', (request, response) => {
  response.render('about');
});

app.use(express.static('public'));

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
  };

  const newBin = new Bin(binJson);
  newBin.save();
  response.json(sampleData);
});

module.exports = app;
