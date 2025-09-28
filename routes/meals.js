const express = require('express');
const router = express.Router();
const db = require('../services/database');
const { authMiddleware } = require('../middleware/auth');

// Log a meal
router.post('/log', authMiddleware, async (req, res) => {
  try {
    const { portions } = req.body;
    const userId = req.user.id;

    const result = await db.query(
      'INSERT INTO meal_logs (user_id, portions, created_at) VALUES ($1, $2, CURRENT_TIMESTAMP) RETURNING *',
      [userId, JSON.stringify(portions)]
    );

    res.json({
      success: true,
      meal: result.rows[0],
      message: 'Meal logged successfully! Your gentle progress continues.'
    });
  } catch (error) {
    console.error('Error logging meal:', error);
    res.status(500).json({ 
      error: 'Failed to log meal',
      message: 'Something went wrong, but that\'s okay. Try again when you\'re ready.'
    });
  }
});

// Get user's recent meals
router.get('/recent', authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id;
    const limit = req.query.limit || 10;

    const result = await db.query(
      'SELECT * FROM meal_logs WHERE user_id = $1 ORDER BY created_at DESC LIMIT $2',
      [userId, limit]
    );

    res.json({
      success: true,
      meals: result.rows
    });
  } catch (error) {
    console.error('Error fetching meals:', error);
    res.status(500).json({ error: 'Failed to fetch meals' });
  }
});

module.exports = router;