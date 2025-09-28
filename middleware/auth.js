const jwt = require('jsonwebtoken');
const admin = require('firebase-admin');
const database = require('../services/database');

// Initialize Firebase Admin SDK
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    }),
  });
}

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

    // Verify Firebase ID token
    const decodedToken = await admin.auth().verifyIdToken(token);
    
    // Get user from database by Firebase UID
    const user = await database.getUserByFirebaseUid(decodedToken.uid);
    
    if (!user) {
      // If user doesn't exist in our database, create them
      const newUser = await database.createUserFromFirebase({
        firebase_uid: decodedToken.uid,
        email: decodedToken.email,
        name: decodedToken.name || decodedToken.email?.split('@')[0] || 'User',
        photo_url: decodedToken.picture
      });
      
      req.user = {
        userId: newUser.id,
        id: newUser.id,
        email: newUser.email,
        goal: newUser.goal,
        bariatric_stage: newUser.bariatric_stage,
        firebase_uid: newUser.firebase_uid
      };
    } else {
      // Add user to request object
      req.user = {
        userId: user.id,
        id: user.id,
        email: user.email,
        goal: user.goal,
        bariatric_stage: user.bariatric_stage,
        firebase_uid: user.firebase_uid
      };
    }

    next();
  } catch (error) {
    console.error('Auth middleware error:', error);
    
    if (error.code === 'auth/id-token-expired') {
      return res.status(401).json({ 
        error: 'Token expired',
        message: 'Your session has expired. Please log in again.'
      });
    }
    
    if (error.code === 'auth/invalid-id-token') {
      return res.status(401).json({ 
        error: 'Invalid token',
        message: 'Please log in again to continue.'
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

    const decodedToken = await admin.auth().verifyIdToken(token);
    const user = await database.getUserByFirebaseUid(decodedToken.uid);
    
    if (user) {
      req.user = {
        id: user.id,
        email: user.email,
        goal: user.goal,
        bariatric_stage: user.bariatric_stage,
        firebase_uid: user.firebase_uid
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
