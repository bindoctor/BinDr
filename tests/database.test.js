const mongoose = require('mongoose');
const {MongoMemoryServer} = require('mongodb-memory-server');
const Bin = require('../models/bin');
const fs = require('fs');
const contents = fs.readFileSync(__dirname + '/testData.json');
const jsonContent = JSON.parse(contents);

let mongoServer;

beforeAll(async () => {
  mongoServer = new MongoMemoryServer();
  const mongoUri = await mongoServer.getConnectionString();
  await mongoose.connect(
    mongoUri,
    {useNewUrlParser: true},
    (err) => {
      if (err) console.error(err);
    });
});

afterAll(async () => {
  mongoose.disconnect();
  await mongoServer.stop();
});

beforeEach(async () => {
  await Bin.deleteMany({})
  await Bin.insertMany(jsonContent)
})

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
