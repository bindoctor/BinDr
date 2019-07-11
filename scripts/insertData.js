require('dotenv').config();
const mongoose = require('mongoose');
const fs = require('fs');

const contents = fs.readFileSync('../tests/testData.json');
const jsonContent = JSON.parse(contents);
const Bin = require('../models/bin');
const BinType = require('../models/binType');

mongoose.connect('CHANGME PLEASE', {useNewUrlParser: true});

BinType.findOne({binTypeName: 'Mixed'}, function(err,result){
  let aBin = {
    type: 'Feature',
    properties: result._id,
    geometry: {
      type: 'Point',
      coordinates: [
        -0.09943485260009766,
        51.524992780414806
      ]
    }
  }
  Bin.create(aBin, () => mongoose.disconnect());
})
