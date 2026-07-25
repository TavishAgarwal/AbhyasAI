const { enqueueWhatsAppMessage } = require('../services/queue');
const { createWhatsAppWorker } = require('../worker');

describe('WhatsApp async pipeline', () => {
  it('adds a webhook payload to BullMQ with retry options', async () => {
    const queue = { add: vi.fn().mockResolvedValue({ id: 'job-1' }) };
    await enqueueWhatsAppMessage({ from: '123', type: 'text' }, queue);
    expect(queue.add).toHaveBeenCalledWith('process-message', { from: '123', type: 'text' }, expect.objectContaining({ attempts: 3 }));
  });

  it('passes queued job data to the coaching worker', async () => {
    const processMessage = vi.fn().mockResolvedValue();
    const WorkerClass = vi.fn();
    createWhatsAppWorker({ connection: {}, processMessage, WorkerClass });
    const processor = WorkerClass.mock.calls.at(-1)[1];
    await processor({ data: { from: '123', type: 'text' } });
    expect(processMessage).toHaveBeenCalledWith({ from: '123', type: 'text' });
  });
});
