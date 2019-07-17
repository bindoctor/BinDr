const mongoose = require('mongoose');
const {MongoMemoryServer} = require('mongodb-memory-server');
const Bin = require('../models/bin');
const BinType = require('../models/binType');
const User = require('../models/user');
const data = require('../tests/testData.js');
const Users = mongoose.model('User');


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
  await BinType.deleteMany({});
  await BinType.insertMany(data.binTypes);
  await Bin.insertMany(data.bins);
  await User.deleteMany({});

  let user = {
    user: {
      email: "test@test.com",
      password: "test123"
    }
  };
  const finalUser = new Users(user.user);
  finalUser.setPassword(user.user.password);
  const userSaved = await finalUser.save();
});
