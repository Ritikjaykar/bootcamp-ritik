import { pool } from './db.ts';

async function safeQuery(query: string, params: any[] = []) {
  try {
    const res = await pool.query(query, params);
    return res.rows;
  } catch (error) {
    console.error('Query error:', query, params, error);
    throw error;
  }
}

process.on('exit', async () => {
  await pool.end();
  console.log('DB pool closed');
});
