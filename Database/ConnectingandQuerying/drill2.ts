import { pool } from './db.ts';

async function drill2() {
  // Insert users safely, ignore if email exists
  await pool.query(
    'INSERT INTO users (name, email) VALUES ($1, $2) ON CONFLICT (email) DO NOTHING',
    ['Alice', 'alice@example.com']
  );

  await pool.query(
    'INSERT INTO users (name, email) VALUES ($1, $2) ON CONFLICT (email) DO NOTHING',
    ['Bob', 'bob@example.com']
  );

  // Fetch user by email
  const email = 'alice@example.com';
  const res = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
  console.log(res.rows);

  await pool.end();
}

drill2();
