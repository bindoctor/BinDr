const express = require('express')
const app = express()

app.get('/', (request, response) => {
  response.send('Hello');
})


module.exports = app;