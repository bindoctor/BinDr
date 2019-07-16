const mongoose = require("mongoose");
const BinType = require("./binType");

const binSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ["Feature"],
    required: true,
    default: "Feature"
  },
  properties: { type: mongoose.Schema.Types.ObjectId, ref: "BinType" },
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

// mongoose.model("Bin", binSchema)

module.exports = mongoose.model("Bin", binSchema);
