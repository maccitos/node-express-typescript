import chai from 'chai';
import chaiHttp from 'chai-http';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const server = require('../../../app');

chai.use(chaiHttp);
const { expect } = chai;
const serverRequest = chai.request(server).keepOpen();
const baseRoute = '/v1/api/users';

const POST = () => {
  describe('POST v1/api/users', () => {
    const newUser = {
      firstName: 'John',
      lastName: 'Gaucho',
      password: '123',
      email: 'j2.gaucho@okmail.com',
    };
    it('Expect to create a new user', (done) => {
      serverRequest
        .post(`${baseRoute}/signup`)
        .type('application/json')
        .send(newUser)
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          done();
        });
    });
  });
};

const GET = () => {
  describe('GET v1/api/users', () => {
    const token =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjoiZmE2ZjE5MDZhNzY2NWJkZGYyYzc0ZDZjYWIxNjc2NDI6OWY4NGQ5ZWQyYWFiYzNjZDU4NTk5OTdiZGE4MjUwNjBkMmYwMmViZTM0NTUzYTRhYjMyMTRiZGY4N2IwZmE0YWNlNWM2ZTlkYTM5ZjM3ZjY3YzM3ZTMzZDQyZjNkYjdlZjY3NzI5OTQ4NGFlMTkwMjRkNjYyYWE2MTk4ZGQ4YWVlNjMyMWEyODA3IiwiaWF0IjoxNjE5MTk5NTQ2LCJleHAiOjE2MTk2MTk1NDZ9.MYxBIzbDEOgKekHQZMJMrOlHoS-7h6Q2sB1t_9wGd4Y';
    it('Expect fetch all users', (done) => {
      serverRequest
        .get(`${baseRoute}/`)
        .set({ Authorization: `Bearer ${token}` })
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.a('object');
          expect(res.body).to.have.property('response');
          expect(res.body).to.have.property('response').to.be.a('array');
          done();
        });
    });
  });
};

describe('Users API', () => {
  /**
   * Test the POST routes
   */
  POST();
  /**
   * Test the GET routes
   */
  GET();
});
