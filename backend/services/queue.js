const { Queue } = require('bullmq');
const { client: redisClient, REDIS_ENABLED } = require('./redisClient');

const WHATSAPP_QUEUE_NAME = 'whatsapp-messages';

let whatsappQueue = null;

if (REDIS_ENABLED && redisClient) {
  whatsappQueue = new Queue(WHATSAPP_QUEUE_NAME, {
    connection: redisClient,
  });
}

async function enqueueWhatsAppMessage(messageData) {
  if (!whatsappQueue) {
    console.warn('WhatsApp message received but Redis is not configured — message dropped.');
    return;
  }
  await whatsappQueue.add('process-message', messageData, {
    attempts: 3,
    backoff: {
      type: 'exponential',
      delay: 2000,
    },
  });
}

module.exports = {
  WHATSAPP_QUEUE_NAME,
  whatsappQueue,
  enqueueWhatsAppMessage,
};
