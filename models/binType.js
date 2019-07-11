const mongoose = require('mongoose');

const binTypeSchema = new mongoose.Schema({
  binTypeName: {
    type: String,
    required: true,
    default: 'Mixed'
  },
  icon: {
    iconUrl: {
      type: String,
      required: true,
      default: '/map-markers/mixed.png'
    },
    iconSize: {
      type: Number,
      required: true,
      default: 0.3
    }
  }
})

module.exports = mongoose.model('BinType', binTypeSchema);
