// we split index.js into app.js and server.js so
// the tests can run without the server running
require('dotenv').config();
const app = require('./app');
const PORT = process.env.PORT || 3000;
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI, {useNewUrlParser: true});


app.listen(PORT, () => console.log(`Your app is listening on port ${PORT}\nView its awesomeness here: http://localhost:${PORT}`));
