// drill3.ts
import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import dotenv from 'dotenv';
import { users, posts } from './drill1.ts';
dotenv.config();

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const db = drizzle(pool);

async function drill3() {
  // Insert posts linked to users
  await db.insert(posts).values([
    { title: 'Post 1', userId: 1 },
    { title: 'Post 2', userId: 2 },
    { title: 'Post 3', userId: 1 },
  ]);

  console.log('Posts inserted.');

  // Fetch posts with user info
  const postWithUser = await db.select({
    postTitle: posts.title,
    userName: users.name,
  }).from(posts).leftJoin(users, users.id.eq(posts.userId));

  console.table(postWithUser);

  await pool.end();
}

drill3();
