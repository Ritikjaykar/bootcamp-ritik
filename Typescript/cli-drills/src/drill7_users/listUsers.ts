import { db, users } from "../drill5_sqlite";

export async function listUsers() {
  const rows = await db.select().from(users);
  console.table(rows);
}
