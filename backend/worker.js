const { Worker } = require('bullmq');
const { client: redisClient, REDIS_ENABLED } = require('./services/redisClient');
const { WHATSAPP_QUEUE_NAME } = require('./services/queue');
const { processWhatsAppMessage } = require('./services/coachingWorker');

function createWhatsAppWorker({ connection = redisClient, processMessage = processWhatsAppMessage, WorkerClass = Worker } = {}) {
  if (!connection) throw new Error('REDIS_URL is required to start the WhatsApp worker.');
  return new WorkerClass(WHATSAPP_QUEUE_NAME, (job) => processMessage(job.data), { connection });
}

if (require.main === module) {
  if (!REDIS_ENABLED || !redisClient) {
    console.error('❌ REDIS_URL not configured. Worker requires Redis. Set REDIS_URL in .env and restart.');
    process.exit(1);
  }
  const worker = createWhatsAppWorker();
  worker.on('completed', (job) => console.log(`Job ${job.id} completed successfully`));
  worker.on('failed', (job, err) => console.error(`Job ${job.id} failed with error ${err.message}`));
  console.log('BullMQ Worker started');
}

module.exports = { createWhatsAppWorker };
