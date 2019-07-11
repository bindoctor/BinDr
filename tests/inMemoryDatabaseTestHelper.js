const mongoose = require('mongoose');
const {MongoMemoryServer} = require('mongodb-memory-server');
const Bin = require('../models/bin');
const fs = require('fs');
const contents = fs.readFileSync(__dirname + '/testData.json');
const jsonContent = JSON.parse(contents);


beforeAll(async () => {
  mongoServer = new MongoMemoryServer();
  const mongoUri = await mongoServer.getConnectionString();
  await mongoose.connect(mongoUri, {useNewUrlParser: true});
});

afterAll(async () => {
  await new Promise((resolve) => setTimeout(() => {
    resolve();
  }, 500)); // avoid jest open handle error with jest and supertest
  await mongoose.disconnect();
  await mongoServer.stop();
});

beforeEach(async () => {
  await Bin.deleteMany({});
  await Bin.insertMany(jsonContent);
});
