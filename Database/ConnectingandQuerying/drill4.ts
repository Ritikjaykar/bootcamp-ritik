import Database from 'better-sqlite3';

const db = new Database(':memory:');

// Create table
db.exec(`CREATE TABLE users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT,
  email TEXT UNIQUE
)`);

// Insert sample
db.prepare('INSERT INTO users (name, email) VALUES (?, ?)').run('Test', 'test@example.com');

// Fetch
const users = db.prepare('SELECT * FROM users').all();
console.log(users);
