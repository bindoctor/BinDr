const express = require('express');
const expressHandlebars = require('express-handlebars');
const app = express();
const sampleData = require('./sampleData');
const bodyParser = require('body-parser');
const applyMorganMiddleware = require('./middleware/morganMiddleware');
const applyEnforceHttps = require('./config/applyEnforceHttps')
require('./models/user');
require('./models/bin');
require('./config/passport');

//The order of these statements is important
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

applyMorganMiddleware(app);
applyEnforceHttps(app);

app.use(require('./routes'));

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

app.get('/', (request, response) => {
  response.render('home');
});

app.get('/about', (request, response) => {
  response.render('about');
});

app.get('/login', (request, response) => {
  response.render('login');
});

app.get('/api/sample-bins', (request, response) => {
  response.json(sampleData);
});


const unknownEndpoint = (request, response) => {
  response.status(404).render('404');
};

app.use(unknownEndpoint);

module.exports = app;
