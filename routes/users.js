const express = require('express');
const { query } = require('../services/database');
const { authMiddleware } = require('../middleware/auth');
const router = express.Router();

// Get current user profile
router.get('/profile', authMiddleware, async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: 'Authentication required' });
    }

    const user = await query('SELECT * FROM users WHERE id = $1', [req.user.userId]);
    
    if (user.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    const userData = user.rows[0];
    res.json({
      user: {
        id: userData.id,
        email: userData.email,
        name: userData.name,
        photo_url: userData.photo_url,
        goal: userData.goal,
        bariatric_stage: userData.bariatric_stage,
        created_at: userData.created_at
      }
    });

  } catch (error) {
    console.error('Profile error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Update user profile
router.put('/profile', authMiddleware, async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: 'Authentication required' });
    }

    const { name, goal, bariatric_stage } = req.body;
    
    // Convert empty strings to null to satisfy check constraints
    const goalValue = goal === '' ? null : goal;
    const bariatricStageValue = bariatric_stage === '' ? null : bariatric_stage;
    
    const result = await query(
      'UPDATE users SET name = $1, goal = $2, bariatric_stage = $3, updated_at = NOW() WHERE id = $4 RETURNING *',
      [name, goalValue, bariatricStageValue, req.user.userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    const userData = result.rows[0];
    res.json({
      message: 'Profile updated successfully',
      user: {
        id: userData.id,
        email: userData.email,
        name: userData.name,
        photo_url: userData.photo_url,
        goal: userData.goal,
        bariatric_stage: userData.bariatric_stage,
        updated_at: userData.updated_at
      }
    });

  } catch (error) {
    console.error('Profile update error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;