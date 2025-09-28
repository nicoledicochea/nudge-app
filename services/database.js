const { Pool } = require('pg');

console.log('DATABASE_URL from env:', process.env.DATABASE_URL ? 'Found' : 'Missing');
console.log('Connection string preview:', process.env.DATABASE_URL?.substring(0, 50));

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: false
});

// Test connection
pool.connect((err, client, release) => {
  if (err) {
    console.error('Error acquiring client', err.stack);
    return;
  }
  console.log('Connected to PostgreSQL database');
  release();
});

// User functions for auth middleware
const getUserById = async (userId) => {
  try {
    const result = await pool.query('SELECT * FROM users WHERE id = $1', [userId]);
    return result.rows[0] || null;
  } catch (error) {
    console.error('Error getting user by ID:', error);
    return null;
  }
};

module.exports = {
  query: (text, params) => pool.query(text, params),
  pool,
  getUserById
};