const { processWhatsAppMessage } = require('../services/coachingWorker');

describe('WhatsApp Coaching Worker', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should handle "hi" message and set state to awaiting_topic', async () => {
    // Setup Supabase mock to return no existing session
    const singleMock = vi.fn().mockResolvedValue({ data: null, error: null });
    const database = { from: vi.fn().mockReturnValue({
      select: () => ({
        eq: () => ({
          single: singleMock
        })
      }),
      upsert: vi.fn().mockResolvedValue({ data: {}, error: null })
    }) };
    const send = vi.fn();

    const message = {
      from: '1234567890',
      type: 'text',
      text: { body: 'hi' }
    };

    await processWhatsAppMessage(message, { database, send });

    // Verify it sent a greeting
    expect(send).toHaveBeenCalledWith(
      '1234567890', 
      expect.stringContaining('What topic or role')
    );
  });
});
