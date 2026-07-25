const { selectNextQuestion } = require('../services/questionSelector');

describe('Question Selector', () => {
  it('should prefer questions that test weak skills', () => {
    // Current skill ratings: skill A is weak (-2.0), skill B is strong (+2.0)
    const skillRatings = [
      { skill_id: 'A', rating: -2.0 },
      { skill_id: 'B', rating: 2.0 }
    ];

    const questions = [
      { id: 'q1', difficulty_rating: 0.0 }, // difficulty 0, skill -2 -> E is far from 0.5
      { id: 'q2', difficulty_rating: -2.0 } // difficulty matches skill -2 -> E = 0.5
    ];

    const mappings = new Map();
    mappings.set('q1', [
      { skillId: 'A', weight: 1.0 }
    ]);
    mappings.set('q2', [
      { skillId: 'A', weight: 1.0 }
    ]);

    const nextQ = selectNextQuestion(questions, skillRatings, mappings);
    
    // It should pick Q2 because its difficulty matches the skill rating, giving E = 0.5
    expect(nextQ.id).toBe('q2');
  });
});
