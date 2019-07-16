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
      .send(
        "bin%5Btype%5D=Mixed&bin%5Blng%5D=-0.10032049072933091&bin%5Blat%5D=51.53245665101659"
      )
      .set("Accept", "application/x-www-form-urlencoded; charset=UTF-8")
      .expect(200, 'added');
  });

  test("", () => {
    
  })
});
