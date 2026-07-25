const { downloadAndTranscribeAudio } = require('../services/audioService');
const fs = require('fs');
const whatsappService = require('../services/whatsappService');

vi.mock('../services/whatsappService', () => ({
  downloadMediaFromWhatsApp: vi.fn()
}));

vi.mock('groq-sdk', () => {
  return vi.fn().mockImplementation(() => ({
    audio: {
      transcriptions: {
        create: vi.fn().mockResolvedValue({ text: 'This is a mock transcription.' })
      }
    }
  }));
});

describe('Audio Service', () => {
  it('should download and transcribe audio', async () => {
    whatsappService.downloadMediaFromWhatsApp.mockResolvedValue({
      buffer: Buffer.from('fake-audio-data')
    });

    const text = await downloadAndTranscribeAudio('fake-id');
    expect(text).toBe('This is a mock transcription.');
  });
});
