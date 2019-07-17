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
  BinType.findOne({ binTypeName: binRequest.bin.type }, "_id", function(err, binType) {
    if(err || !binType) {
      console.log('Bin type not found')
      response.status(422).send('Bin type not found')
    } else {
      console.log(binType);
      Bin.create(
        {
          properties: binType._id,
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

router.delete("/", (request, response) => {
  lng = request.body.bin.lng
  lat = request.body.bin.lat
  console.log([lng, lat])

  Bin.findOne({}, (err, result) => {
    console.log(result)
  })
  
  Bin.deleteMany({
    geometry: {
      type: 'Point',
      coordinates: [lng, lat]
    }
  }, (err, numberRemoved) => {
    if (numberRemoved.deletedCount === 0) {
      response.status(409).json({ status: "No bins deleted" } ).send()
    } else {
      response.json({ status: "success" } ).send()
    }
  })
})

module.exports = router;
