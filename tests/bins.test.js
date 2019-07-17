const request = require("supertest");
const app = require("../app");
const GJV = require('geojson-validation');
const api = request(app);
const Bin = require('../models/bin')

require('./inMemoryDatabaseTestHelper');

describe('GET /', () => {
  test('shows /api/bins page', () => {
    return api.get('/api/bins').expect(200);
  });
  test('check /api/bins gives valid geoJSON', async () => {
    const response = await api.get('/api/bins');
    expect(GJV.valid(response.body)).toBe(true);
  });
});

describe("POST /", () => {
  test("200 response when bin created", () => {
    return api.post("/api/bins")
      .send({
        bin: {
          type: 'Mixed',
          lng: 0.09447038699008203,
          lat: 51.528767194015444
        }
      })
      .set("Accept", "application/json; charset=UTF-8")
      .expect(200, 'added');
  });

  test("422 response when bin type not valid", () => {
    return api.post("/api/bins")
      .send({
        bin: {
          type: 'asdf',
          lng: 0.09447038699008203,
          lat: 51.528767194015444
        }
      })
      .set("Accept", "application/json; charset=UTF-8")
      .expect(422);
  })
  test("422 response when bad coordinates", () => {
    return api.post("/api/bins")
      .send({
        bin: {
          type: 'Glass',
          lng: 'Hello',
          lat: 51.528767194015444
        }
      })
      .set("Accept", "application/json; charset=UTF-8")
      .expect(422);
  })
});

describe('DELETE /', function() {

  let addedId

  beforeEach((done) => {
   Bin.findOne({}, (err, result) => {
      addedId = result._id
      console.log(addedId)
      done()
    })
  });

  test("200 response when bin deleted", () => {

    return api.delete("/api/bins")
      .send({
        bin: {
          id: addedId
        }
      })
      .expect(200)
  })

  test("400 response when bin doesn't exist", () => {
    return api.delete("/api/bins")
      .send({
        bin: {
          id: 'nope'
        }
      })
      .expect(400)
  })

  test("409 response when invalid query", () => {
    return api.delete("/api/bins")
      .send({
        bin: {
          hello: 'goodbye'
        }
      })
      .expect(409)
  })
})
