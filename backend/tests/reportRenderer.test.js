const { renderReport } = require('../services/reportRenderer');

const report = {
  summary: 'Strong fundamentals with one improvement area.', overall_score: 0.75,
  skill_progression: [{ skill_name: 'JavaScript', category: 'technical', starting_rating: 0, ending_rating: 1, delta: 1 }],
  top_strengths: ['Explains scope clearly'], top_gaps: ['Include an example'], recommendations: ['Practice closures']
};

describe('accessible report templates', () => {
  it('renders all three formats with distinct structures', () => {
    const standard = renderReport(report, 'Frontend Engineer', 'standard');
    const dyslexia = renderReport(report, 'Frontend Engineer', 'dyslexia');
    const adhd = renderReport(report, 'Frontend Engineer', 'adhd');
    expect(standard).toContain('<table');
    expect(dyslexia).toContain('dyslexia-para');
    expect(adhd).toContain('skill-card');
    expect(new Set([standard, dyslexia, adhd]).size).toBe(3);
  });
});
