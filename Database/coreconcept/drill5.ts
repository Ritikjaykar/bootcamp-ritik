import { client, connectDB } from './db.ts';

async function drill5() {
  await connectDB();

  // Insert profiles with metadata
  await client.query(`
  INSERT INTO profiles (user_id, bio, metadata)
  VALUES
    (1, 'I love databases!', '{"twitter": "@alice", "hobbies": ["reading", "cycling"]}'),
    (2, 'Backend engineer', '{"twitter": "@bob", "hobbies": ["gaming", "cooking"]}'),
    (3, 'Full-stack dev', '{"twitter": "@charlie", "hobbies": ["travel", "music"]}')
  ON CONFLICT (user_id) DO UPDATE
    SET metadata = EXCLUDED.metadata;
`);


  // Fetch all profiles
  const res = await client.query('SELECT * FROM profiles;');
  console.log('Profiles:', res.rows);

  await client.end();
}

drill5();
