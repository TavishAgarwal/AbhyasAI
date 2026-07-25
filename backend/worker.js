const { Worker } = require('bullmq');
const { client: redisClient, REDIS_ENABLED } = require('./services/redisClient');
const { WHATSAPP_QUEUE_NAME } = require('./services/queue');
const { processWhatsAppMessage } = require('./services/coachingWorker');

if (!REDIS_ENABLED || !redisClient) {
  console.error('❌ REDIS_URL not configured. Worker requires Redis. Set REDIS_URL in .env and restart.');
  process.exit(1);
}

const worker = new Worker(WHATSAPP_QUEUE_NAME, async (job) => {
  console.log(`Processing job ${job.id}:`, job.data);
  await processWhatsAppMessage(job.data);
}, {
  connection: redisClient,
});

worker.on('completed', (job) => {
  console.log(`Job ${job.id} completed successfully`);
});

worker.on('failed', (job, err) => {
  console.error(`Job ${job.id} failed with error ${err.message}`);
});

console.log('BullMQ Worker started');
