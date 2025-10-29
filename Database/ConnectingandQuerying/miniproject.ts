// miniproject.ts
import { pool, connectDB } from './db.ts';

async function miniProject() {
  await connectDB();

  // 1️ Create tables safely
  await pool.query(`
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      name TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL
    );

    CREATE TABLE IF NOT EXISTS profiles (
      user_id INT PRIMARY KEY REFERENCES users(id),
      bio TEXT,
      metadata JSONB
    );

    CREATE TABLE IF NOT EXISTS posts (
      id SERIAL PRIMARY KEY,
      title TEXT NOT NULL,
      body TEXT,
      author_id INT REFERENCES users(id),
      comment_count INT DEFAULT 0
    );
  `);

  // 2️ Ensure unique constraint exists for posts BEFORE inserting
  const constraintCheck = await pool.query(`
    SELECT 1
    FROM pg_constraint
    WHERE conname = 'unique_post_per_author';
  `);

  if (constraintCheck.rowCount === 0) {
    await pool.query(`
      ALTER TABLE posts
      ADD CONSTRAINT unique_post_per_author UNIQUE (title, author_id);
    `);
    console.log('Added unique constraint on posts(title, author_id)');
  } else {
    console.log('Unique constraint already exists on posts(title, author_id)');
  }

  console.log('Tables created or already exist.');

  // 3️ Insert sample users safely
  await pool.query(`
    INSERT INTO users (name, email) VALUES
      ('Alice', 'alice@example.com'),
      ('Bob', 'bob@example.com'),
      ('Charlie', 'charlie@example.com')
    ON CONFLICT (email) DO NOTHING;
  `);

  // 4️ Get user IDs
  const usersRes = await pool.query(`SELECT id, name FROM users ORDER BY id;`);
  const userIds = usersRes.rows.map(u => u.id);
  console.log('User IDs:', userIds);

  // 5️ Insert sample profiles safely
  const profiles = [
    { bio: 'I love databases!', metadata: { twitter: '@alice', hobbies: ['reading', 'cycling'] } },
    { bio: 'Backend engineer', metadata: { twitter: '@bob', hobbies: ['gaming', 'cooking'] } },
    { bio: 'Full-stack dev', metadata: { twitter: '@charlie', hobbies: ['travel', 'music'] } }
  ];

  for (let i = 0; i < userIds.length; i++) {
    await pool.query(`
      INSERT INTO profiles (user_id, bio, metadata)
      VALUES ($1, $2, $3)
      ON CONFLICT ON CONSTRAINT profiles_pkey DO NOTHING;
    `, [userIds[i], profiles[i].bio, JSON.stringify(profiles[i].metadata)]);
  }

  console.log('Profiles inserted.');

  // 6️ Insert posts safely
  const posts = [
    { title: 'Post 1', body: 'Learning SQL basics', author_idx: 0, count: 3 },
    { title: 'Post 2', body: 'Advanced Postgres tricks', author_idx: 1, count: 5 },
    { title: 'Post 3', body: 'Node + DB integration', author_idx: 0, count: 1 },
    { title: 'Post 4', body: 'JSONB in action', author_idx: 2, count: 2 },
    { title: 'Post 5', body: 'Normalization vs Denormalization', author_idx: 1, count: 0 }
  ];

  for (const post of posts) {
    await pool.query(`
      INSERT INTO posts (title, body, author_id, comment_count)
      VALUES ($1, $2, $3, $4)
      ON CONFLICT ON CONSTRAINT unique_post_per_author DO NOTHING;
    `, [post.title, post.body, userIds[post.author_idx], post.count]);
  }

  console.log('Posts inserted.');

  // 7️ Fetch all posts with author names
  const postsRes = await pool.query(`
    SELECT p.id, p.title, p.body, u.name AS author_name, p.comment_count
    FROM posts p
    JOIN users u ON p.author_id = u.id
    ORDER BY p.id;
  `);

  console.log('\nAll posts with authors:');
  console.table(postsRes.rows);

  // 8️ Fetch a user + profile
  const userRes = await pool.query(`
    SELECT u.id, u.name, u.email, p.bio, p.metadata
    FROM users u
    JOIN profiles p ON u.id = p.user_id
    WHERE u.id = $1;
  `, [userIds[0]]);

  console.log('\nUser + profile for first user:');
  console.log(userRes.rows[0]);

  await pool.end();
}

miniProject();
