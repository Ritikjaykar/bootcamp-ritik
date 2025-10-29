import { mapUser } from './user.ts'; // only import functions/constants
import { pool } from './db.ts';

interface User {  // define types here for TS
  id: number;
  name: string;
  email: string;
}

async function drill3() {
  const res = await pool.query('SELECT * FROM users;');
  const users: User[] = res.rows.map(mapUser);

  console.log('Users:', users);

  await pool.end();
}

drill3();
