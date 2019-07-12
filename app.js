const express = require('express');
const expressHandlebars = require('express-handlebars');
const httpsLocalhost = require("https-localhost")

// const app = express();
const app = httpsLocalhost()

const sampleData = require('./sampleData');
const Bin = require('./models/bin');
const applyMorganMiddleware = require('./middleware/morganMiddleware');
const enforce = require('express-sslify');
require('dotenv').config();

// if (process.env.NODE_ENV !== 'dev' && process.env.NODE_ENV !== 'test') {
  app.use(enforce.HTTPS());
// }

app.engine('handlebars', expressHandlebars({
  defaultLayout: 'main',
  helpers: {
    mapboxKey: function() {
      return process.env.MAPBOX_KEY;
    },
  },
}));

app.set('view engine', 'handlebars');

applyMorganMiddleware(app);

// if(process.env.NODE_ENV != 'dev') {
//   app.get('*', function(req, res) {  
//     res.redirect('https://' + req.headers.host + req.url);
//   })
// }


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
        '_id': 0}, function(err, bins) {
        // if (err) return err
        let binsCollection = {
          "type": "FeatureCollection",
          "features": bins};
        response.json(binsCollection);
      });
});

const unknownEndpoint = (request, response) => {
  response.status(404).render('404');
};

app.use(unknownEndpoint);

module.exports = app;
