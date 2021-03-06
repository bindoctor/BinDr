const router = require("express").Router();
const mongoose = require("mongoose");
const Bin = mongoose.model("Bin");
const BinType = mongoose.model("BinType");
const auth = require('../auth');

// { geometry: 1, type: 1, _id: 0, properties: 1 }
router.get("/", (request, response) => {
  Bin.find({}, { geometry: 1, type: 1, properties: 1})
    .populate('properties.binType')
    .exec(function(err, bins) {
      // if (err) return err
      const binsCollection = {
        type: "FeatureCollection",
        features: bins
      };
      response.json(binsCollection);
    });
});

router.post("/", auth.required, (request, response) => {
  const binRequest = request.body;
  BinType.findOne({ binTypeName: binRequest.bin.type }, "_id", function(err, binType) {
    if(err || !binType) {
      response.status(422).send('Bin type not found')
    } else {
      Bin.create(
        {
          properties: {binType: binType._id},
          geometry: {
            coordinates: [
              Number(binRequest.bin.lng),
              Number(binRequest.bin.lat)
            ]
          }
        },
        function(err) {
          if (err) {
            response.status(422).send('Writing bin failed')
          } else {
            response.send("added");
          }
        }
      )
    };
  });
});

router.delete("/", auth.required, (request, response) => {
  binId = request.body.bin.id

  Bin.deleteMany({
    _id: binId
  }, (err, numberRemoved) => {
    if(!numberRemoved) {
      response.status(400).json({ status: "Invalid request" } ).send()
    } else if (numberRemoved.deletedCount === 0) {
      response.status(409).json({ status: "No bins deleted" } ).send()
    } else {
      response.json({ status: "success" } ).send()
    }
  })
})

module.exports = router;
