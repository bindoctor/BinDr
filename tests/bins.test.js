const request = require("supertest");
const app = require("../app");
const GJV = require('geojson-validation');
const api = request(app);

require('./inMemoryDatabaseTestHelper');

let token;
beforeAll(function(done) {
  api.post('/api/users')
    .send({
      user :{
        email : "test@test.com",
        password : "test123"
      }
    })
    .end(function(err, res) {
      if (err) throw err;
      token = res.body.user.token;
      done();
    });
});

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
      .set("Authorization", `Token ${token}`)
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
      .set("Authorization", `Token ${token}`)
      .expect(422);
  });

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
      .set("Authorization", `Token ${token}`)
      .expect(422);
  })
});
