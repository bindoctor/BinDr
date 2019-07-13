// we split index.js into app.js and server.js so
// the tests can run without the server running
require('dotenv').config();
const app = require('./app');
const PORT = process.env.PORT || 3000;
const mongoose = require('mongoose');

if (process.env.NODE_ENV == 'dev') {
  mongoose.connect(process.env.MONGODB_DEV_URI, {useNewUrlParser: true});
} else {
  mongoose.connect(process.env.MONGODB_URI, {useNewUrlParser: true});
}


app.listen(PORT, () => console.log(`Environment is ${process.env.NODE_ENV}. Your app is listening on port ${PORT}\nView its awesomeness here: http://localhost:${PORT}`));
