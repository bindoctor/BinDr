const express = require('express');
const expressHandlebars = require('express-handlebars');
const app = express();

app.engine('handlebars', expressHandlebars({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');


app.get('/', (request, response) => {
  response.render('home');
});

app.get('/about', (request, response) => {
  response.render('about');
});

module.exports = app;
