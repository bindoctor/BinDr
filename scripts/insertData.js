require('dotenv').config();
const mongoose = require('mongoose');
const fs = require('fs');

const contents = fs.readFileSync('../tests/testData.json');
const jsonContent = JSON.parse(contents);
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


// BinType.findOne({binTypeName: 'Mixed'}, function(err, result) {
//   const aBin = {
//     type: 'Feature',
//     properties: result._id,
//     geometry: {
//       type: 'Point',
//       coordinates: [
//         -0.09943485260009766,
//         51.524992780414806,
//       ],
//     },
//   };
//   Bin.create(aBin, () => mongoose.disconnect());
// });
