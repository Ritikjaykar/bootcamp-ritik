import { client, connectDB } from './db.ts';

type User = {
  id: number;
  name: string;
  email: string;
};

async function drill1() {
  await connectDB();

  // Create users table
  await client.query(`
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      name TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL
    );
  `);

  // Insert sample users
  await client.query(`
    INSERT INTO users (name, email) VALUES
    ('Alice', 'alice@example.com'),
    ('Bob', 'bob@example.com')
    ON CONFLICT (email) DO NOTHING;
  `);

  // Fetch users
  const res = await client.query('SELECT * FROM users');
  const users: User[] = res.rows;

  console.log('Users:', users);

  await client.end();
}

drill1();
