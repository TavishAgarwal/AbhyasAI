const { getExpectedPerformance, updateRatings, K_FACTOR } = require('../services/eloRating');

describe('Elo Math (IRT 1PL)', () => {
  it('should calculate expected performance correctly', () => {
    // If learnerRating == questionDifficulty, E should be 0.5
    expect(getExpectedPerformance(0.0, 0.0)).toBeCloseTo(0.5, 3);
    
    // If learnerRating > questionDifficulty, E > 0.5
    expect(getExpectedPerformance(1.0, 0.0)).toBeCloseTo(0.731, 3);
    
    // If learnerRating < questionDifficulty, E < 0.5
    expect(getExpectedPerformance(-1.0, 0.0)).toBeCloseTo(0.269, 3);
  });

  it('should update ratings correctly based on score', () => {
    const params = {
      score: 1.0, // perfect score
      questionDifficulty: 0.0,
      skillRatings: [
        { skillId: 's1', rating: 0.0, weight: 1.0 }, // primary skill
        { skillId: 's2', rating: 0.0, weight: 0.5 }  // secondary skill
      ]
    };

    const { skillChanges, questionDifficultyChange } = updateRatings(params);
    
    // E for both skills is 0.5
    // Delta for s1: K * weight * (S - E) = 0.4 * 1.0 * (1.0 - 0.5) = 0.2
    // Delta for s2: K * weight * (S - E) = 0.4 * 0.5 * (1.0 - 0.5) = 0.1
    
    const s1Change = skillChanges.find(s => s.skillId === 's1');
    const s2Change = skillChanges.find(s => s.skillId === 's2');
    
    expect(s1Change.delta).toBeCloseTo(0.2, 3);
    expect(s2Change.delta).toBeCloseTo(0.1, 3);
    
    // Question difficulty update
    // E_avg = (0.5 * 1.0 + 0.5 * 0.5) / 1.5 = 0.5
    // BetaDelta = K * (E_avg - S) = 0.4 * (0.5 - 1.0) = -0.2
    
    expect(questionDifficultyChange.delta).toBeCloseTo(-0.2, 3);
  });
});
