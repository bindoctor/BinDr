const app = require('../app');
const GJV = require('geojson-validation');
const request = require('supertest');
const api = request(app);

afterAll(async () => {
  await new Promise((resolve) => setTimeout(() => {
    resolve();
  }, 500)); // avoid jest open handle error with jest and supertest
});

describe('main page loads', () => {
  test('shows main page', () => {
    return api.get('/').expect(200);
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
  test('shows /api/sample-bins page', async () => {
    const response = await api.get('/api/sample-bins');
    expect(GJV.valid(response.body)).toBe(true);
  });
});