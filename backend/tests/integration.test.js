const request = require('supertest');
const app = require('../server');

describe('server integration contracts', () => {
  it('loads the application and rejects an unauthenticated credit-burning request', async () => {
    const response = await request(app).post('/api/sessions/start').send({});
    expect(response.status).toBe(401);
    expect(response.body.error).toMatch(/authentication required/i);
  });

  it('accepts a request without contacting external services for an unknown path', async () => {
    const response = await request(app).get('/not-a-route');
    expect(response.status).toBe(404);
  });
});
