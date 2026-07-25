const express = require('express');
const router = express.Router();
const { supabase } = require('../services/supabaseClient');

// GET /api/dashboard/sessions
router.get('/sessions', async (req, res) => {
  try {
    const { data: sessions, error } = await supabase
      .from('sessions')
      .select('id, topics_or_roles(raw_input), created_at, answers(score)')
      .eq('user_id', req.user.id)
      .order('created_at', { ascending: false })
      .limit(10);
      
    if (error) throw error;
    
    const formatted = sessions.map(s => {
      const answers = s.answers || [];
      const avgScore = answers.length > 0 
        ? answers.reduce((sum, a) => sum + (a.score || 0), 0) / answers.length 
        : 0;
        
      return {
        id: s.id,
        topic: s.topics_or_roles?.raw_input || 'Unknown Topic',
        date: s.created_at,
        score: avgScore
      };
    });
    
    res.json(formatted);
  } catch (err) {
    console.error(`[GET /api/dashboard/sessions] ${err.message}`);
    res.status(500).json({ error: 'Unable to load dashboard sessions.' });
  }
});

// GET /api/dashboard/stats
router.get('/stats', async (req, res) => {
  try {
    const { data: sessions, error: sErr } = await supabase
      .from('sessions')
      .select('id, created_at, answers(score)')
      .eq('user_id', req.user.id);
      
    if (sErr) throw sErr;
    
    const sessionIds = (sessions || []).map(s => s.id);
    const { data: skills, error: skErr } = await supabase
      .from('skill_ratings')
      .select('rating, skills(name)')
      .in('session_id', sessionIds);
      
    if (skErr) throw skErr;
    
    // Calculate stats
    let totalScore = 0;
    let totalAnswers = 0;
    
    sessions.forEach(s => {
      (s.answers || []).forEach(a => {
        totalScore += (a.score || 0);
        totalAnswers++;
      });
    });
    
    const averageScore = totalAnswers > 0 ? totalScore / totalAnswers : 0;
    
    // Group skills by name
    const skillMap = new Map();
    skills.forEach(sk => {
      const name = sk.skills?.name;
      if (name) {
        if (!skillMap.has(name) || skillMap.get(name) < sk.rating) {
          skillMap.set(name, sk.rating);
        }
      }
    });
    
    const skillsRadar = Array.from(skillMap.entries())
      .map(([skill, rating]) => ({ skill, rating }))
      .slice(0, 5); // top 5
      
    // Calculate real progress trend
    const dateScores = new Map();
    sessions.forEach(s => {
      const dateStr = s.created_at.split('T')[0];
      const sAnswers = s.answers || [];
      const sScore = sAnswers.length > 0 
        ? sAnswers.reduce((sum, a) => sum + (a.score || 0), 0) / sAnswers.length
        : 0;
        
      if (!dateScores.has(dateStr)) {
        dateScores.set(dateStr, { total: 0, count: 0 });
      }
      dateScores.get(dateStr).total += sScore;
      dateScores.get(dateStr).count++;
    });

    const progressTrend = Array.from(dateScores.entries())
      .map(([date, data]) => {
        const d = new Date(date);
        const displayDate = d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
        return {
          date: displayDate,
          score: data.total / data.count,
          rawDate: date
        };
      })
      .sort((a, b) => a.rawDate.localeCompare(b.rawDate))
      .slice(-7);
    
    // Calculate Active Streak
    let activeStreak = 0;
    if (sessions.length > 0) {
      const uniqueDates = [...new Set(sessions.map(s => s.created_at.split('T')[0]))].sort().reverse();
      const todayStr = new Date().toISOString().split('T')[0];
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      const yesterdayStr = yesterday.toISOString().split('T')[0];

      if (uniqueDates[0] === todayStr || uniqueDates[0] === yesterdayStr) {
        let currentDate = new Date(uniqueDates[0]);
        activeStreak = 1;
        for (let i = 1; i < uniqueDates.length; i++) {
          const expectedDate = new Date(currentDate);
          expectedDate.setDate(expectedDate.getDate() - 1);
          if (uniqueDates[i] === expectedDate.toISOString().split('T')[0]) {
            activeStreak++;
            currentDate = expectedDate;
          } else {
            break;
          }
        }
      }
    }
    
    res.json({
      totalSessions: sessions.length,
      averageScore,
      skillsRadar,
      progressTrend,
      activeStreak
    });
  } catch (err) {
    console.error(`[GET /api/dashboard/stats] ${err.message}`);
    res.status(500).json({ error: 'Unable to load dashboard statistics.' });
  }
});

module.exports = router;
