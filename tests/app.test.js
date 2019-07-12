const app = require('../app');
const GJV = require('geojson-validation');
const request = require('supertest');
const api = request(app);
require('./inMemoryDatabaseTestHelper');


describe('main page loads', () => {
  test('shows main page', () => {
    return api.get('/').expect(200);
  });
});

describe('error page loads', () => {
  test('returns a 404', () => {
    return api.get('/not-gonna-be-a-link-that-exists').expect(404);
  });

  test('returns a message saying 404', async () => {
    const response = await api.get('/not-gonna-be-a-link-that-exists');
    expect(response.text).toContain('Sorry, an error has occurred, Requested page not found!');
  });
});

describe('about page loads', () => {
  test('shows about page', () => {
    return api.get('/about').expect(200);
  });
});

describe('/api/sample-bins', () => {
  test('shows /api/sample-bins page', () => {
    return api.get('/api/sample-bins').expect(200);
  });
  test('check /api/sample-bins give valid geoJSON', async () => {
    const response = await api.get('/api/sample-bins');
    expect(GJV.valid(response.body)).toBe(true);
  });
});

describe('/api/bins', () => {
  test('shows /api/bins page', () => {
    return api.get('/api/bins').expect(200);
  });
  test('check /api/bins gives invalid geoJSON', async () => {
    const response = await api.get('/api/bins');
    expect(GJV.valid(response.body)).toBe(true);
  });
});

describe('/api/users', () => {
  test('accepts user credentials', () => {
    return api.post('/api/users')
      .send({user: {
        email: "user@test.com",
        password: "password123"
      }})
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200);

  });
});

describe('/api/users/current', () => {
  test('when logged in I can see stuff', async () => {
    let token;
    await api.post('/api/users')
      .send({user: {
          email: "user@test.com",
          password: "password123"
        }})
      .set('Accept', 'application/json')
      .then(response => {
        token = response.body.user.token;
      });
    return api.get('/api/users/current')
      .set('Authorization', 'Token ' + token)
      .set('Accept', 'application/json')
      .expect(200);
  });
});

