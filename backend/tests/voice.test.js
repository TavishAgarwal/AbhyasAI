const { downloadAndTranscribeAudio } = require('../services/audioService');
const fs = require('fs');

describe('Audio Service', () => {
  it('should download and transcribe audio', async () => {
    const transcribe = vi.fn().mockResolvedValue({ text: 'This is a mock transcription.' });
    const text = await downloadAndTranscribeAudio('fake-id', {
      downloadMedia: vi.fn().mockResolvedValue({ buffer: Buffer.from('fake-audio-data') }),
      convert: vi.fn().mockImplementation((_, output) => { fs.writeFileSync(output, ''); return Promise.resolve(output); }),
      client: { audio: { transcriptions: { create: transcribe } } },
      fileFactory: vi.fn(() => ({}))
    });
    expect(text).toBe('This is a mock transcription.');
    expect(transcribe).toHaveBeenCalledOnce();
  });
});
