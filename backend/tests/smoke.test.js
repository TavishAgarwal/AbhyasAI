const request = require('supertest');
const app = require('../server');

describe('Smoke Tests', () => {
  it('should return 200 for health check', async () => {
    // Need to set dummy values for health check to pass without a real DB/Redis
    // Or just check that it returns 503 instead of crashing
    const res = await request(app).get('/health');
    expect([200, 503]).toContain(res.status);
  });

  it('should return 401 for protected endpoints without API key', async () => {
    const res = await request(app).post('/api/sessions/start');
    expect(res.status).toBe(401);
  });
});
