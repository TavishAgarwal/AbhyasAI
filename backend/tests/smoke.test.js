const request = require('supertest');
const app = require('../server');

describe('Smoke Tests', () => {
  it('should return 404 for an unknown route', async () => {
    const res = await request(app).get('/not-a-route');
    expect(res.status).toBe(404);
  });

  it('should return 401 for protected endpoints without API key', async () => {
    const res = await request(app).post('/api/sessions/start');
    expect(res.status).toBe(401);
  });
});
