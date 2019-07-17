const mongoose = require("mongoose");
const BinType = require("./binType");

const binSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ["Feature"],
    required: true,
    default: "Feature"
  },
  properties: { 
    binType: { type: mongoose.Schema.Types.ObjectId, ref: "BinType" }
  },
  geometry: {
    type: {
      type: String,
      enum: ["Point"],
      required: true,
      default: "Point"
    },
    coordinates: {
      type: [Number],
      required: true
    }
  }
});

binSchema.virtual('properties.binId').get(function() {
  return this._id.toHexString();
})

binSchema.set('toJSON', {virtuals: true})
binSchema.set('toObject', {virtuals: true})


module.exports = mongoose.model("Bin", binSchema);
