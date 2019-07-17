const request = require("supertest");
const app = require("../app");
const GJV = require('geojson-validation');
const api = request(app);

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
  test("200 response when bin deleted", () => {
    return api.delete("/api/bins")
      .send({
        bin: {
          lng: -0.09943485260009766,
          lat: 51.524992780414806,
        }
      })
      .expect(200)
  })

  test("409 response when bin doesn't exist", () => {
    return api.delete("/api/bins")
      .send({
        bin: {
          lng: -0.1234,
          lat: 51.5678,
        }
      })
      .expect(409)
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
