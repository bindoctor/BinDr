const app = require('../app');
const request = require('supertest');
const api = request(app);

require('./inMemoryDatabaseTestHelper');

let token;

beforeEach(async () => {
  await api.post('/api/users')
      .send({user: {
        email: 'user@test.com',
        password: 'password123',
      }})
      .set('Accept', 'application/json')
      .then((response) => {
        token = response.body.user.token;
      });
});


describe('/api/users', () => {
  test('accepts user credentials', () => {
    return api.post('/api/users')
        .send({user: {
          email: 'user@test.com',
          password: 'password123',
        }})
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200);
  });
  test('reports 422 status code when no email specified', () => {
    return api.post('/api/users')
        .send({user: {
          email: '',
          password: 'password123',
        }})
        .set('Accept', 'application/json')
        .expect(422)
        .then((response) => {
          expect(response.body.errors.email).toEqual('is required');
        });
  });
  test('reports 422 status code when no password specified', () => {
    return api.post('/api/users')
      .send({user: {
          email: 'user@test.com',
          password: '',
        }})
      .set('Accept', 'application/json')
      .expect(422)
      .then((response) => {
        expect(response.body.errors.password).toEqual('is required');
      });
  });
});


describe('/api/users/current', () => {
  test('when logged in I can see stuff', async () => {
    return api.get('/api/users/current')
        .set('Authorization', 'Token ' + token)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        .then((response) => {
          expect(response.body.user.email).toEqual('user@test.com');
          expect(response.body.user.token).toEqual(token);
        });
  });

  test('when not passing a valid token in I cant see stuff', async () => {
    return api.get('/api/users/current')
      .set('Accept', 'application/json')
      .expect(401)
  })
});

describe('/api/users/login', () => {
  test('can login', async () => {
    return api.post('/api/users/login')
        .set('Accept', 'application/json')
        .send({user: {
          email: 'user@test.com',
          password: 'password123',
        }})
        .expect('Content-Type', /json/)
        .expect(200)
        .then((response) => {
          expect(response.body.user.email).toEqual('user@test.com');
          expect(typeof(response.body.user.token)).toEqual('string');
        });
  });
  test('reports 422 status code when no email specified', () => {
    return api.post('/api/users/login')
      .send({user: {
          email: '',
          password: 'password123',
        }})
      .set('Accept', 'application/json')
      .expect(422)
      .then((response) => {
        expect(response.body.errors.email).toEqual('is required');
      });
  });
  test('reports 422 status code when no password specified', () => {
    return api.post('/api/users/login')
      .send({user: {
          email: 'user@test.com',
          password: '',
        }})
      .set('Accept', 'application/json')
      .expect(422)
      .then((response) => {
        expect(response.body.errors.password).toEqual('is required');
      });
  });
  test('reports 400 status code when email is invalid', () => {
    return api.post('/api/users/login')
      .send({user: {
          email: 'dontexist@test.com',
          password: 'password123',
        }})
      .set('Accept', 'application/json')
      .expect(500)
  });

});
