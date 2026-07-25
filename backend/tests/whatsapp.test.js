const { processWhatsAppMessage } = require('../services/coachingWorker');
const { supabase } = require('../services/supabaseClient');
const whatsappService = require('../services/whatsappService');

// Mock external dependencies
vi.mock('../services/supabaseClient', () => ({
  supabase: {
    from: vi.fn(() => ({
      select: vi.fn(() => ({
        eq: vi.fn(() => ({
          single: vi.fn()
        }))
      })),
      upsert: vi.fn()
    }))
  }
}));

vi.mock('../services/whatsappService', () => ({
  sendText: vi.fn()
}));

// Mock fetch for localApiCall
global.fetch = vi.fn();

describe('WhatsApp Coaching Worker', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should handle "hi" message and set state to awaiting_topic', async () => {
    // Setup Supabase mock to return no existing session
    const singleMock = vi.fn().mockResolvedValue({ data: null, error: null });
    supabase.from.mockReturnValue({
      select: () => ({
        eq: () => ({
          single: singleMock
        })
      }),
      upsert: vi.fn().mockResolvedValue({ data: {}, error: null })
    });

    const message = {
      from: '1234567890',
      type: 'text',
      text: { body: 'hi' }
    };

    await processWhatsAppMessage(message);

    // Verify it sent a greeting
    expect(whatsappService.sendText).toHaveBeenCalledWith(
      '1234567890', 
      expect.stringContaining('What topic or role')
    );
  });
});
