require('dotenv').config();
const mongoose = require('mongoose');

const Bin = require('../models/bin');
const BinType = require('../models/binType');
const data = require('../tests/testData.js');

mongoose.connect(process.env.SCRIPT_DB_URL, {useNewUrlParser: true});

Bin.deleteMany({}, () => {
  BinType.deleteMany({}, () => {
    BinType.insertMany(data.binTypes, () => {
      Bin.insertMany(data.bins, () => mongoose.disconnect());
    });
  });
});

