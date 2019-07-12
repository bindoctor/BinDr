const app = require('../app');
const request = require('supertest');
const api = request(app);

require('./inMemoryDatabaseTestHelper');

let token;

beforeEach(async () => {
  await api.post('/api/users')
  .send({user: {
    email: "user@test.com",
    password: "password123"
  }})
  .set('Accept', 'application/json')
  .then(response => {
    token = response.body.user.token;
  })
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
    return api.get('/api/users/current')
      .set('Authorization', 'Token ' + token)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .then(response => {
        expect(response.body.user.email).toEqual('user@test.com')
        expect(response.body.user.token).toEqual(token)
      })
  });
});

describe('/api/users/login', () => {
  test ('can login', async () => {
    return api.post('/api/users/login')
      .set('Accept', 'application/json')
      .send({user: {
        email: "user@test.com",
        password: "password123"
      }})
      .expect('Content-Type', /json/)
      .expect(200)
      .then(response => {
        expect(response.body.user.email).toEqual('user@test.com')
        expect(typeof(response.body.user.token)).toEqual('string')
      })
  })
})
