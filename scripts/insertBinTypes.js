require('dotenv').config();


const mongoose = require('mongoose');
const BinType = require('../models/binType');

mongoose.connect(<DEV URL>, {useNewUrlParser: true});

BinType.create({
  binTypeName: 'Mixed',
  icon: {
    iconUrl: '/map-markers/mixed.png',
    iconSize: 0.3
  }
}, () => {
  mongoose.disconnect();
});

