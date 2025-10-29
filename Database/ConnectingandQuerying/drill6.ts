import { pool } from './db.ts';
import Database from 'better-sqlite3';

interface User {
  id: number;
  name: string;
  email: string;
}

class UserRepository {
  db: any;
  dbType: 'postgres' | 'sqlite';

  constructor(dbType: 'postgres' | 'sqlite') {
    this.dbType = dbType;
    if (dbType === 'sqlite') {
      this.db = new Database(':memory:');
      this.db.exec('CREATE TABLE users (id INTEGER PRIMARY KEY, name TEXT, email TEXT UNIQUE)');
    }
  }

  async createUser(user: Omit<User, 'id'>) {
    if (this.dbType === 'postgres') {
      await pool.query('INSERT INTO users (name, email) VALUES ($1, $2)', [user.name, user.email]);
    } else {
      this.db.prepare('INSERT INTO users (name, email) VALUES (?, ?)').run(user.name, user.email);
    }
  }

  async listUsers(): Promise<User[]> {
    if (this.dbType === 'postgres') {
      const res = await pool.query('SELECT * FROM users');
      return res.rows;
    } else {
      return this.db.prepare('SELECT * FROM users').all();
    }
  }

  async findUserByEmail(email: string): Promise<User | null> {
    if (this.dbType === 'postgres') {
      const res = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
      return res.rows[0] || null;
    } else {
      return this.db.prepare('SELECT * FROM users WHERE email = ?').get(email) || null;
    }
  }
}
