const app = require('../app');


const request = require('supertest');
const api = request(app);


describe('main page loads', () => {

  test('shows main page', () => {
    return api.get('/').expect(200);
  });
});


