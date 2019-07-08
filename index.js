const express = require('express')
const app = express()

app.get('/', (request, response) => {
  response.send('Hello');
})

app.listen(3000, () => console.log(`Your app is listening on port 3000`))

module.exports = {app};