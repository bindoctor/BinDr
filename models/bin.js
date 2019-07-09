const mongoose = require('mongoose');

const binSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['Feature'],
    required: true,
    default: 'Feature',
  },
  properties: {},
  geometry: {
    type: {
      type: String,
      enum: ['Point'],
      required: true,
      default: 'Point',
    },
    coordinates: {
      type: [Number],
      required: true,
    },
  },
});

module.exports = mongoose.model('Bin', binSchema);
