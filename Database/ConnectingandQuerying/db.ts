// db.ts
import { Pool } from 'pg';
import dotenv from 'dotenv';
dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export async function connectDB() {
  try {
    const res = await pool.query('SELECT NOW()');
    console.log('Connected to PostgreSQL at:', res.rows[0].now);
  } catch (error) {
    console.error('DB connection error:', error);
    throw error;
  }
}

export { pool };
