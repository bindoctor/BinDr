const app = require('../app');

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
