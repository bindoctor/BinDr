require('./inMemoryDatabaseTestHelper');
const Bin = require('../models/bin');
const BinType = require('../models/binType');


describe('One entry in Database', () => {
  test('Saves data entry', async () => {
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
    };
    const newBin = new Bin(binJson);
    await newBin.save();
    const count = await Bin.countDocuments();
    expect(count).toEqual(21);
  });
});

describe('Mock data loaded correctly', () => {
  test('Populates the right number of documents', async () => {
    const count = await Bin.countDocuments();
    expect(count).toEqual(20);
  });
});
