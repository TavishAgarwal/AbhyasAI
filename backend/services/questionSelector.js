// backend/services/questionSelector.js
// AbhyasAI — Adaptive question selector using expected performance (E ≈ 0.5)

const { getExpectedPerformance } = require('./eloRating');

/**
 * Selects the next best question from a pool, targeting E ≈ 0.5.
 * 
 * @param {Array} availableQuestions - Questions not yet answered in the session
 * @param {Array<{ skill_id: string, weight: number, rating: number }>} currentSkillRatings - User's current ratings for skills tested by the questions
 * @param {Map<string, Array<{ skillId: string, weight: number }>>} questionMappings - Map of question_id -> skill mappings
 * @returns {Object|null} The selected question object or null if no questions available
 */
function selectNextQuestion(availableQuestions, currentSkillRatings, questionMappings) {
  if (!availableQuestions || availableQuestions.length === 0) {
    return null;
  }

  // Create a lookup for current ratings: skillId -> rating
  const ratingLookup = {};
  for (const sr of currentSkillRatings) {
    ratingLookup[sr.skill_id] = sr.rating || 0.0;
  }

  let bestQuestion = null;
  let smallestDistance = Infinity;
  const TARGET_E = 0.5;

  for (const question of availableQuestions) {
    const mappings = questionMappings.get(question.id) || [];
    
    // If no mappings, fallback distance
    if (mappings.length === 0) {
      if (bestQuestion === null) bestQuestion = question;
      continue;
    }

    let totalE = 0;
    let totalWeight = 0;

    for (const m of mappings) {
      const theta_u = ratingLookup[m.skillId] || 0.0;
      const E = getExpectedPerformance(theta_u, question.difficulty_rating || 0.0);
      totalE += E * m.weight;
      totalWeight += m.weight;
    }

    const avgE = totalWeight > 0 ? totalE / totalWeight : 0.5;
    const distanceToTarget = Math.abs(TARGET_E - avgE);

    if (distanceToTarget < smallestDistance) {
      smallestDistance = distanceToTarget;
      bestQuestion = question;
    }
  }

  return bestQuestion || availableQuestions[0];
}

module.exports = { selectNextQuestion };
