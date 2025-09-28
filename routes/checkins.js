const express = require('express');
const { query } = require('../services/database');
const { authMiddleware } = require('../middleware/auth');
const router = express.Router();

// Log check-in
router.post('/log', authMiddleware, async (req, res) => {
  try {
    const { mood, energy_level, stress_level, notes } = req.body;
    const userId = req.user.userId;

    if (!mood || energy_level === undefined || stress_level === undefined) {
      return res.status(400).json({
        error: 'Mood, energy_level, and stress_level are required'
      });
    }

    // Validate ranges (1-10)
    if (energy_level < 1 || energy_level > 10 || stress_level < 1 || stress_level > 10) {
      return res.status(400).json({
        error: 'Energy level and stress level must be between 1 and 10'
      });
    }

    const result = await query(
      `INSERT INTO check_ins (user_id, mood, energy_level, stress_level, notes, created_at)
       VALUES ($1, $2, $3, $4, $5, NOW())
       RETURNING *`,
      [userId, mood, energy_level, stress_level, notes || null]
    );

    res.status(201).json({
      message: 'Check-in logged successfully',
      checkin: result.rows[0]
    });

  } catch (error) {
    console.error('Check-in logging error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get recent check-ins
router.get('/recent', authMiddleware, async (req, res) => {
  try {
    const userId = req.user.userId;
    const limit = parseInt(req.query.limit) || 10;

    const result = await query(
      `SELECT * FROM check_ins
       WHERE user_id = $1
       ORDER BY created_at DESC
       LIMIT $2`,
      [userId, limit]
    );

    res.json({
      checkins: result.rows
    });

  } catch (error) {
    console.error('Error fetching check-ins:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;