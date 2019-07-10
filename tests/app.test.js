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

describe('error page loads', () => {
  test('returns a 404', () => {
    return api.get('/not-gonna-be-a-link-that-exists').expect(404);
  });

  test('returns a message saying 404', async () => {
    const response = await api.get('/not-gonna-be-a-link-that-exists');
    expect(response.text).toContain('Sorry, an error has occurred, Requested page not found!')
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

describe('/api/bins', () => {
  test('shows /api/bins page', () => {
    return api.get('/api/bins').expect(200);
  });
});

