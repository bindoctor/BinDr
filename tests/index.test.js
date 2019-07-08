const app = require('../app');


const request = require('supertest');
const api = request(app);


describe('main page loads', () => {

  // afterEach(async () => {
  //   await server.close();
  // })

  test('shows main page', () => {
    return api.get('/').expect(200);
  });
});


