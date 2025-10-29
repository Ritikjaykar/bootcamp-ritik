// drill2.ts
import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import dotenv from 'dotenv';
import { users } from './drill1.ts';
dotenv.config();

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const db = drizzle(pool);

async function drill2() {
  // Insert users
  await db.insert(users).values([
    { name: 'Alice', email: 'alice@example.com' },
    { name: 'Bob', email: 'bob@example.com' },
    { name: 'Charlie', email: 'charlie@example.com' },
  ]).onConflictDoNothing();

  console.log('Users inserted.');

  // Fetch all users
  const allUsers = await db.select().from(users);
  console.table(allUsers);

  // Update a user
  await db.update(users).set({ email: 'alice@newdomain.com' }).where(users.name.eq('Alice'));
  console.log('Updated Alice\'s email.');

  // Delete a user
  await db.delete(users).where(users.name.eq('Charlie'));
  console.log('Deleted Charlie.');

  await pool.end();
}

drill2();
