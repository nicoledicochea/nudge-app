const express = require('express');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const { authMiddleware } = require('../middleware/auth');
const router = express.Router();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

router.post('/', authMiddleware, async (req, res) => {
  try {
    const { message } = req.body;
    const userId = req.user.userId;

    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    // Get the generative model
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

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

    const result = await model.generateContent(systemPrompt);
    const response = await result.response;
    const text = response.text();

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
      error: 'Sorry, I had trouble processing that. Please try again.'
    });
  }
});

module.exports = router;