const express = require('express');
const expressHandlebars = require('express-handlebars');
const app = express();
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
  Bin.find({},function(err,bins) {
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
