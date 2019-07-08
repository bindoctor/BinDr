const express = require('express')
const app = express()

app.get('/', (request, response) => {
  response.send('Hello');
})

const port = 3000

app.listen(port, () => console.log(`Your rubbish app is listening on port ${port} 🗑 `))

module.exports = {app};