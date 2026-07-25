const { Queue } = require('bullmq');
const { client: redisClient, REDIS_ENABLED } = require('./redisClient');

const WHATSAPP_QUEUE_NAME = 'whatsapp-messages';
const DOC_GEN_QUEUE_NAME = 'document-generation';

let whatsappQueue = null;
let docGenQueue = null;

if (REDIS_ENABLED && redisClient) {
  whatsappQueue = new Queue(WHATSAPP_QUEUE_NAME, {
    connection: redisClient,
  });
  docGenQueue = new Queue(DOC_GEN_QUEUE_NAME, {
    connection: redisClient,
  });
}

async function enqueueWhatsAppMessage(messageData, queue = whatsappQueue) {
  if (!queue) {
    console.warn('WhatsApp message received but Redis is not configured — message dropped.');
    return;
  }
  await queue.add('process-message', messageData, {
    attempts: 3,
    backoff: {
      type: 'exponential',
      delay: 2000,
    },
    removeOnComplete: true,
    removeOnFail: false,
  });
}

async function enqueueDocumentGeneration(jobData, queue = docGenQueue) {
  if (!queue) {
    throw new Error('Redis is not configured — cannot enqueue document generation.');
  }
  const job = await queue.add('generate-doc', jobData, {
    attempts: 2,
    backoff: {
      type: 'exponential',
      delay: 5000,
    },
    removeOnComplete: true, // we store result in Supabase
    removeOnFail: false,
  });
  return job.id;
}

module.exports = {
  WHATSAPP_QUEUE_NAME,
  DOC_GEN_QUEUE_NAME,
  whatsappQueue,
  docGenQueue,
  enqueueWhatsAppMessage,
  enqueueDocumentGeneration
};
