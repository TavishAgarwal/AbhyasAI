const { Worker } = require('bullmq');
const { client: redisClient, REDIS_ENABLED } = require('./services/redisClient');
const { WHATSAPP_QUEUE_NAME, DOC_GEN_QUEUE_NAME } = require('./services/queue');
const { processWhatsAppMessage } = require('./services/coachingWorker');
const { processDocumentJob } = require('./services/documentWorker');

function createWhatsAppWorker({ connection = redisClient, processMessage = processWhatsAppMessage, WorkerClass = Worker } = {}) {
  if (!connection) throw new Error('REDIS_URL is required to start the WhatsApp worker.');
  return new WorkerClass(WHATSAPP_QUEUE_NAME, (job) => processMessage(job.data), { connection });
}

function createDocumentWorker({ connection = redisClient, processDocJob = processDocumentJob, WorkerClass = Worker } = {}) {
  if (!connection) throw new Error('REDIS_URL is required to start the Document worker.');
  // concurrency: 2 to limit memory usage from Puppeteer
  return new WorkerClass(DOC_GEN_QUEUE_NAME, (job) => processDocJob(job.data), { connection, concurrency: 2 });
}

if (require.main === module) {
  if (!REDIS_ENABLED || !redisClient) {
    console.error('❌ REDIS_URL not configured. Worker requires Redis. Set REDIS_URL in .env and restart.');
    process.exit(1);
  }
  const waWorker = createWhatsAppWorker();
  waWorker.on('completed', (job) => console.log(`WA Job ${job.id} completed successfully`));
  waWorker.on('failed', (job, err) => console.error(`WA Job ${job.id} failed with error ${err.message}`));
  
  const docWorker = createDocumentWorker();
  docWorker.on('completed', (job) => console.log(`Doc Job ${job.id} completed successfully`));
  docWorker.on('failed', (job, err) => console.error(`Doc Job ${job.id} failed with error ${err.message}`));

  console.log('BullMQ Workers started');
}

module.exports = { createWhatsAppWorker, createDocumentWorker };
