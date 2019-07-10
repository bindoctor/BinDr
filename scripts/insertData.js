require('dotenv').config();
const mongoose = require('mongoose');
const fs = require('fs');
const contents = fs.readFileSync('testData.json');
const jsonContent = JSON.parse(contents);
const Bin = require('../models/bin');

mongoose.connect(process.env.MONGODB_URI, {useNewUrlParser: true});

Bin.insertMany(jsonContent, () => mongoose.disconnect() );
