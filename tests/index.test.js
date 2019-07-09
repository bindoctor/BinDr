const app = require('../app');

const request = require('supertest');
const api = request(app);

describe('main page loads', () => {
  test('shows main page', () => {
    return api.get('/').expect(200);
  });
});

describe('about page loads', () => {
  test('shows about page', () => {
    api.get('/about').expect(200);
  });
});
