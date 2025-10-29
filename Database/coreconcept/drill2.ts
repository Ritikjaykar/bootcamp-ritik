import { client, connectDB } from './db.ts';

type User = { id: number; name: string; email: string };
type UserProfile = { user: User; bio: string };

async function drill2() {
  await connectDB();

  // Create profile table
  await client.query(`
    CREATE TABLE IF NOT EXISTS profile (
      user_id INT PRIMARY KEY REFERENCES users(id),
      bio TEXT
    );
  `);

  // Insert profile
  await client.query(`
    INSERT INTO profile (user_id, bio) VALUES
    (1, 'I love databases!'),
    (2, 'Backend engineer')
    ON CONFLICT (user_id) DO NOTHING;
  `);

  // Query user + profile
  const res = await client.query(`
    SELECT u.id, u.name, u.email, p.bio
    FROM users u
    JOIN profile p ON u.id = p.user_id;
  `);

  const userProfiles: UserProfile[] = res.rows.map(row => ({
    user: { id: row.id, name: row.name, email: row.email },
    bio: row.bio
  }));

  console.log('User Profiles:', userProfiles);

  await client.end();
}

drill2();
