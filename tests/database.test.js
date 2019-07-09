const mongoose = require('mongoose');
const {MongoMemoryServer} = require('mongodb-memory-server');
const Bin = require('../models/bin');

let mongoServer;

beforeAll(async () => {
  mongoServer = new MongoMemoryServer();
  const mongoUri = await mongoServer.getConnectionString();
  await mongoose.connect(mongoUri, (err) => {
    if (err) console.error(err);
  });
});

afterAll(async () => {
  mongoose.disconnect();
  await mongoServer.stop();
});

describe('One entry in Database', () => {
  test('Saves data entry', async () => {
    const binJson = {
      type: 'Feature',
      properties: {},
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
    const count = await Bin.count();
    expect(count).toEqual(1);
  });
});
