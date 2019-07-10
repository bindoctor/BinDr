const express = require('express');
const expressHandlebars = require('express-handlebars');
const app = express();
const sampleData = require('./sampleData');
const Bin = require('./models/bin');

require('dotenv').config();

const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI,  { useNewUrlParser: true });

app.engine('handlebars', expressHandlebars({
  defaultLayout: 'main',
  helpers: {
    googleKey: function () {
      return process.env.GOOGLE_KEY;
    }
  }
}));

app.set('view engine', 'handlebars');

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
  Bin.find({},{'geometry': 1, 'type': 1, '_id': 0, p },function(err,bins) {
    if (err) return err
    let binsCollection = {
      "type": "FeatureCollection",
      "features": bins}
    
    response.json(binsCollection);  
  });
});

const unknownEndpoint = (request, response) => {
  response.status(404).render('404')
};

app.use(unknownEndpoint);

module.exports = app;
