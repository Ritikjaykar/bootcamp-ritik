import { pgTable, serial, text, integer } from 'drizzle-orm/pg-core';
import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import dotenv from 'dotenv';
dotenv.config();

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const db = drizzle(pool);

// Define tables
export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull(),
});

export const posts = pgTable('posts', {
  id: serial('id').primaryKey(),
  title: text('title').notNull(),
  userId: integer('user_id').references(() => users.id),
});

// ✅ Safe way to log column names
console.log('Schemas defined:');
console.log('Users table columns:', Object.keys(users).filter(k => !k.startsWith('$')));
console.log('Posts table columns:', Object.keys(posts).filter(k => !k.startsWith('$')));
