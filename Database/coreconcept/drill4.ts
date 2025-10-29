import { client, connectDB } from './db.ts';

async function drill4() {
  await connectDB();

  // 1️ Add comment_count column if not exists
  await client.query(`
    ALTER TABLE posts
    ADD COLUMN IF NOT EXISTS comment_count INT DEFAULT 0;
  `);

  // 2️ Create comments table
  await client.query(`
    CREATE TABLE IF NOT EXISTS comments (
      id SERIAL PRIMARY KEY,
      post_id INT REFERENCES posts(id),
      content TEXT
    );
  `);

  // 3️ Insert multiple comments
  const comments = [
    { post_id: 1, content: 'Great post!' },
    { post_id: 1, content: 'Very helpful.' },
    { post_id: 2, content: 'Nice tips!' },
  ];

  for (const c of comments) {
    await client.query(`
      INSERT INTO comments (post_id, content)
      VALUES ($1, $2)
    `, [c.post_id, c.content]);

    // 4️ Update comment_count in posts (denormalized column)
    await client.query(`
      UPDATE posts
      SET comment_count = comment_count + 1
      WHERE id = $1
    `, [c.post_id]);
  }

  // 5️ Fetch posts without counting comments (fast read)
  const res = await client.query(`
    SELECT id, title, body, comment_count
    FROM posts;
  `);

  console.log('Posts with denormalized comment_count:', res.rows);

  await client.end();
}

drill4();
