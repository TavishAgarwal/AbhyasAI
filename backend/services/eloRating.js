// backend/services/eloRating.js
// AbhyasAI — Multidimensional Elo Rating System
// Pure functions for updating learner skill ratings (θ_u) and question difficulty (β_i).

// K=0.4 is calibrated for a 0-centered rating scale (not traditional chess 1500).
// With ratings near 0 and the logistic sigmoid, K=0.4 gives rating shifts of
// ±0.1–0.4 per answer — smooth convergence over a 5–10 question session.
// Spec suggests K≈32, which is for chess-scale (1500-centered) ratings.
const K_FACTOR = 0.4;

/**
 * Calculates the expected performance (E) of a learner on a question.
 * @param {number} learnerRating - Current Elo rating for the skill (θ_u)
 * @param {number} questionDifficulty - Current Elo difficulty of the question (β_i)
 * @returns {number} Expected performance between 0.0 and 1.0
 */
function getExpectedPerformance(learnerRating, questionDifficulty) {
  // E = 1 / (1 + exp(-(θ_u - β_i)))
  return 1.0 / (1.0 + Math.exp(-(learnerRating - questionDifficulty)));
}

/**
 * Updates learner ratings and question difficulty based on an answer score.
 * Updates are applied per-skill, scaled by the Q-matrix weight.
 * 
 * @param {Object} params
 * @param {number} params.score - The evaluation score (S) between 0.0 and 1.0
 * @param {number} params.questionDifficulty - Current β_i
 * @param {Array<{ skillId: string, rating: number, weight: number }>} params.skillRatings - Learner's current ratings (θ_u) and mapping weights for this question
 * @returns {Object} { skillChanges: Array, questionDifficultyChange: Object }
 */
function updateRatings({ score, questionDifficulty, skillRatings }) {
  // Clamp score
  const S = Math.max(0.0, Math.min(1.0, score));
  
  const skillChanges = [];
  let totalExpectedPerformance = 0;
  let totalWeight = 0;

  for (const skill of skillRatings) {
    const { skillId, rating: theta_u, weight } = skill;
    
    // Skip if weight is 0
    if (weight <= 0) continue;

    // Expected performance for this specific skill against the question
    const E = getExpectedPerformance(theta_u, questionDifficulty);
    totalExpectedPerformance += E * weight;
    totalWeight += weight;

    // K_effective scales the update by how much the question tests this skill
    const kEffective = K_FACTOR * weight;
    
    // θ_u_new = θ_u + K_eff * (S - E)
    const newRating = theta_u + kEffective * (S - E);
    const delta = newRating - theta_u;

    skillChanges.push({
      skillId,
      oldRating: theta_u,
      newRating,
      delta,
    });
  }

  // Question difficulty update
  let betaDelta = 0;
  if (totalWeight > 0) {
    // Average expected performance across all tested skills
    const avgE = totalExpectedPerformance / totalWeight;
    // β_i_new = β_i + K_avg * (E_avg - S)
    // We use standard K_FACTOR for the question update
    betaDelta = K_FACTOR * (avgE - S);
  }
  
  const newQuestionDifficulty = questionDifficulty + betaDelta;

  const questionDifficultyChange = {
    old: questionDifficulty,
    new: newQuestionDifficulty,
    delta: betaDelta,
  };

  return { skillChanges, questionDifficultyChange };
}

module.exports = { getExpectedPerformance, updateRatings, K_FACTOR };
