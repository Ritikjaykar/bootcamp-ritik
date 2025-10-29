import { client, connectDB } from './db.ts';

async function drill3() {
  await connectDB();

  // Drop posts table if exists
  await client.query(`DROP TABLE IF EXISTS posts`);

  // Create posts table with normalized author reference
  await client.query(`
    CREATE TABLE IF NOT EXISTS posts (
      id SERIAL PRIMARY KEY,
      title TEXT NOT NULL,
      body TEXT,
      author_id INT REFERENCES users(id)
    );
  `);

  // Insert posts (author_id instead of author_name)
  await client.query(`
    INSERT INTO posts (title, body, author_id) VALUES
    ('Post 1', 'Learning SQL basics', 1),
    ('Post 2', 'Advanced Postgres tricks', 2),
    ('Post 3', 'Node + DB integration', 1)
    ON CONFLICT DO NOTHING;
  `);

  // Query posts with author info using JOIN
  const res = await client.query(`
    SELECT p.id, p.title, p.body, u.name AS author_name, u.email AS author_email
    FROM posts p
    JOIN users u ON p.author_id = u.id;
  `);

  console.log('Posts with Author:', res.rows);

  await client.end();
}

drill3();
