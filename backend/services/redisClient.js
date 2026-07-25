const { Redis } = require('ioredis');

const REDIS_URL = process.env.REDIS_URL;
const REDIS_ENABLED = !!REDIS_URL;

let redisClient = null;

if (REDIS_ENABLED) {
  redisClient = new Redis(REDIS_URL, {
    maxRetriesPerRequest: null,
  });
  redisClient.on('error', (err) => {
    console.error('Redis client error:', err.message);
  });
  redisClient.on('connect', () => {
    console.log(`[${new Date().toISOString()}] Redis connected`);
  });
} else {
  console.warn(`[${new Date().toISOString()}] ⚠️  REDIS_URL not set — WhatsApp queue features disabled.`);
}

module.exports = {
  client: redisClient,
  REDIS_ENABLED
};
