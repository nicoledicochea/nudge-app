const express = require('express');
const { authMiddleware } = require('../middleware/auth');
const router = express.Router();

router.post('/', authMiddleware, async (req, res) => {
  try {
    const { message } = req.body;
    const userId = req.user.userId;

    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    // Create a gentle, encouraging system prompt for the nutrition coach
    const systemPrompt = `You are a supportive and encouraging nutrition coach for the Nudge app.
    Your role is to provide gentle, non-judgmental guidance about healthy eating habits.

    Guidelines:
    - Be warm, encouraging, and understanding
    - Avoid being preachy or overwhelming
    - Focus on small, achievable changes
    - Celebrate progress, no matter how small
    - If someone shares a setback, be supportive and help them refocus
    - Keep responses concise but meaningful
    - Use a conversational, friendly tone

    User message: ${message}`;

    // Call Gemini API directly via REST
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: systemPrompt
            }]
          }]
        })
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Gemini API error:', errorData);
      throw new Error(`Gemini API failed: ${response.status}`);
    }

    const data = await response.json();
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text || 'No response generated';

    res.json({
      message: text,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Chat error:', error);

    // Handle specific API errors
    if (error.message?.includes('API key')) {
      return res.status(500).json({ error: 'AI service configuration error' });
    }

    res.status(500).json({
      error: 'Sorry, I had trouble processing that. Please try again.',
      details: error.message
    });
  }
});

module.exports = router;