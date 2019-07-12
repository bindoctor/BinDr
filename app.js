const express = require('express');
const expressHandlebars = require('express-handlebars');
const app = express();
const sampleData = require('./sampleData');
const Bin = require('./models/bin');
require('./models/user');
require('./config/passport');

const applyMorganMiddleware = require('./middleware/morganMiddleware');
const applyEnforceHttps = require('./applyEnforceHttps')
require('dotenv').config();

app.engine('handlebars', expressHandlebars({
  defaultLayout: 'main',
  helpers: {
    mapboxKey: function() {
      return process.env.MAPBOX_KEY;
    },
  },
}));

app.set('view engine', 'handlebars');
applyEnforceHttps(app)
applyMorganMiddleware(app);


app.get('/', (request, response) => {
  response.render('home');
});

app.get('/about', (request, response) => {
  response.render('about');
});

app.use(express.static('public'));

app.get('/api/sample-bins', (request, response) => {
  response.json(sampleData);
});

app.get('/api/bins', (request, response) => {
  Bin.find({},
      {'geometry': 1,
        'type': 1,
        '_id': 0,
        'properties': 1}).
      populate('properties').
      exec(function(err, bins) {
        // if (err) return err
        const binsCollection = {
          'type': 'FeatureCollection',
          'features': bins};
        response.json(binsCollection);
      });
});

const unknownEndpoint = (request, response) => {
  response.status(404).render('404');
};

app.use(unknownEndpoint);

module.exports = app;
