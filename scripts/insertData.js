require('dotenv').config();
const mongoose = require('mongoose');
const fs = require('fs');

const contents = fs.readFileSync('../tests/testData.json');
const jsonContent = JSON.parse(contents);
const Bin = require('../models/bin');
const BinType = require('../models/binType');

console.log (process.env.MONGODB_DEVURI)
mongoose.connect(process.env.MONGODB_URI, {useNewUrlParser: true});

Bin.insertMany(jsonContent, () => mongoose.disconnect() );
