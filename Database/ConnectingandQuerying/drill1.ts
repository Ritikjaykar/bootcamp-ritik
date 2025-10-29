// drill1.ts
import { connectDB, pool } from './db.ts';

async function drill1() {
  await connectDB();

  const res = await pool.query('SELECT NOW()');
  console.log('Current time:', res.rows[0].now);

  await pool.end();
  console.log('Connection closed.');
}

drill1();
