const Bin = require('../models/bin');
const BinType = require('../models/binType');

describe('find bin type IDs'), () => {
  test('find bin type IDs'), () => {
    const binJson = {
      type: 'Feature',
      properties: (new BinType)._id,
      geometry: {
        type: 'Point',
        coordinates: [
          -0.0996708869934082,
          51.52560021903987,
        ],
      },
  }
}