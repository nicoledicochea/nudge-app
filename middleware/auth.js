const jwt = require('jsonwebtoken');
const database = require('../services/database');

const authMiddleware = async (req, res, next) => {
  try {
    // Get token from header
    const authHeader = req.header('Authorization');
    
    if (!authHeader) {
      return res.status(401).json({ 
        error: 'Access denied',
        message: 'No token provided. Please log in to continue.'
      });
    }

    // Extract token from "Bearer <token>"
    const token = authHeader.startsWith('Bearer ') 
      ? authHeader.slice(7) 
      : authHeader;

    if (!token) {
      return res.status(401).json({ 
        error: 'Access denied',
        message: 'Invalid token format. Please log in again.'
      });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Get user from database
    const user = await database.getUserById(decoded.userId);
    
    if (!user) {
      return res.status(401).json({ 
        error: 'Access denied',
        message: 'User not found. Please log in again.'
      });
    }

    // Add user to request object
    req.user = {
      userId: user.id,
      id: user.id,
      email: user.email,
      goal: user.goal,
      bariatric_stage: user.bariatric_stage
    };

    next();
  } catch (error) {
    console.error('Auth middleware error:', error);
    
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ 
        error: 'Invalid token',
        message: 'Please log in again to continue.'
      });
    }
    
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ 
        error: 'Token expired',
        message: 'Your session has expired. Please log in again.'
      });
    }

    res.status(500).json({ 
      error: 'Authentication error',
      message: 'Unable to verify your identity. Please try again.'
    });
  }
};

// Optional auth middleware for routes that work with or without auth
const optionalAuth = async (req, res, next) => {
  try {
    const authHeader = req.header('Authorization');
    
    if (!authHeader) {
      return next(); // Continue without user
    }

    const token = authHeader.startsWith('Bearer ') 
      ? authHeader.slice(7) 
      : authHeader;

    if (!token) {
      return next(); // Continue without user
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await database.getUserById(decoded.userId);
    
    if (user) {
      req.user = {
        id: user.id,
        email: user.email,
        goal: user.goal,
        bariatric_stage: user.bariatric_stage
      };
    }

    next();
  } catch (error) {
    // If auth fails, continue without user
    next();
  }
};

module.exports = {
  authMiddleware,
  optionalAuth
};
