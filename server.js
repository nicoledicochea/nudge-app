require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { createTables } = require('./services/initDB');
// const VectorDBService = require('./services/vectorDB');

const app = express();
const PORT = process.env.PORT || 3000;

// Initialize vector database
// const vectorDB = new VectorDBService();

// Middleware
app.use(cors());
app.use(express.json());

// Initialize databases
const initializeServices = async () => {
  try {
    console.log('Initializing services...');
    
    // Try to initialize database
    try {
      await createTables();
      console.log('✅ PostgreSQL connected');
    } catch (dbError) {
      console.log('⚠️  PostgreSQL not available:', dbError.message);
    }
    
    // Try to initialize vector database
    // try {
    //   await vectorDB.initialize();
    //   console.log('✅ ChromaDB connected');
    // } catch (vectorError) {
    //   console.log('⚠️  ChromaDB not available:', vectorError.message);
    // }
    
    console.log('Server ready (some services may be unavailable)');
  } catch (error) {
    console.error('Service initialization failed:', error.message);
  }
};

initializeServices();

// Make vectorDB available to routes
// app.locals.vectorDB = vectorDB;

// Add after your middleware section
app.use('/api/meals', require('./routes/meals'));
app.use('/api/checkins', require('./routes/checkins'));
app.use('/api/users', require('./routes/users'));
app.use('/api/chat', require('./routes/chat'));

// Test endpoint
app.get('/api/test', (req, res) => {
  res.json({ message: 'Nudge API is working!' });
});

// Basic health check
app.get('/health', (req, res) => {
  res.json({ 
    status: 'Nudge server is running!', 
    timestamp: new Date().toISOString(),
    services: {
      server: 'Running',
      database: 'Check logs for status',
      vectorDB: 'Check logs for status'
    }
  });
});

app.listen(PORT, () => {
  console.log(`Nudge server running on port ${PORT}`);
});