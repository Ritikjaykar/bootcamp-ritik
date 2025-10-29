// miniProject.ts
import { client, connectDB } from './db.ts';

async function miniProject() {
  await connectDB();

  try {
    // 1️ Drop tables in correct order
    await client.query(`
      DROP TABLE IF EXISTS posts CASCADE;
      DROP TABLE IF EXISTS profile CASCADE;
      DROP TABLE IF EXISTS users CASCADE;
    `);

    // 2️ Create users table
    await client.query(`
      CREATE TABLE users (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL
      );
    `);

    // 3️ Create profile table with JSONB metadata
    await client.query(`
      CREATE TABLE profile (
        user_id INT PRIMARY KEY REFERENCES users(id),
        bio TEXT,
        metadata JSONB
      );
    `);

    // 4️ Create posts table with unique constraint for ON CONFLICT
    await client.query(`
      CREATE TABLE posts (
        id SERIAL PRIMARY KEY,
        title TEXT NOT NULL,
        body TEXT,
        author_id INT REFERENCES users(id),
        comment_count INT DEFAULT 0,
        UNIQUE(title, author_id)
      );
    `);

    console.log('Tables created successfully.');

    // 5️ Insert users
    await client.query(`
      INSERT INTO users (name, email)
      VALUES
        ('Alice', 'alice@example.com'),
        ('Bob', 'bob@example.com'),
        ('Charlie', 'charlie@example.com')
      ON CONFLICT (email) DO NOTHING;
    `);

    // 6️ Insert profiles with JSONB metadata
    await client.query(`
      INSERT INTO profile (user_id, bio, metadata)
      VALUES
        (1, 'I love databases!', '{"twitter": "@alice", "hobbies": ["reading", "cycling"]}'),
        (2, 'Backend engineer', '{"twitter": "@bob", "hobbies": ["gaming", "cooking"]}'),
        (3, 'Full-stack dev', '{"twitter": "@charlie", "hobbies": ["travel", "music"]}')
      ON CONFLICT (user_id) DO UPDATE
        SET metadata = EXCLUDED.metadata;
    `);

    // 7️ Insert posts
    await client.query(`
      INSERT INTO posts (title, body, author_id, comment_count)
      VALUES
        ('Post 1', 'Learning SQL basics', 1, 3),
        ('Post 2', 'Advanced Postgres tricks', 2, 5),
        ('Post 3', 'Node + DB integration', 1, 1),
        ('Post 4', 'JSONB in action', 3, 2),
        ('Post 5', 'Normalization vs Denormalization', 2, 0)
      ON CONFLICT (title, author_id) DO NOTHING;
    `);

    console.log('Sample data inserted successfully.');

    // 8️ Query posts with author names (normalization example)
    const postsRes = await client.query(`
      SELECT p.id, p.title, p.body, u.name AS author_name, p.comment_count
      FROM posts p
      JOIN users u ON p.author_id = u.id;
    `);

    console.log('Posts with authors:');
    console.table(postsRes.rows);

    // 9️ Query profiles with metadata (JSONB example)
    const profilesRes = await client.query('SELECT * FROM profile;');
    console.log('Profiles with metadata:');
    console.table(profilesRes.rows);

  } catch (error) {
    console.error('Error in miniProject:', error);
  } finally {
    await client.end();
    console.log('Disconnected from PostgreSQL');
  }
}

// Run the mini project
miniProject();
