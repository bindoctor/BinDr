const router = require("express").Router();
const mongoose = require("mongoose");
const Bin = mongoose.model("Bin");

router.get("/", (request, response) => {
  Bin.find({}, { geometry: 1, type: 1, _id: 0, properties: 1 })
    .populate("properties")
    .exec(function(err, bins) {
      // if (err) return err
      const binsCollection = {
        type: "FeatureCollection",
        features: bins
      };
      response.json(binsCollection);
    });
});

module.exports = router;
