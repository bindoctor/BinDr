const router = require("express").Router();
const mongoose = require("mongoose");
const Bin = mongoose.model("Bin");
const BinType = mongoose.model("BinType");

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

router.post("/", (request, response) => {
  const binRequest = request.body;
  BinType.findOne({ binTypeName: binRequest["bin[type]"] }, "_id", function(
    _err,
    binTypeID
  ) {
    console.log(binTypeID);
    Bin.create(
      {
        properties: binTypeID._id,
        geometry: {
          coordinates: [
            Number(binRequest["bin[lng]"]),
            Number(binRequest["bin[lat]"])
          ]
        }
      },
      function(err) {
        if (err) {
        }
      }
    );
  });
  response.send("added");
});

module.exports = router;
