import Database from "better-sqlite3";
import { drizzle } from "drizzle-orm/better-sqlite3";
import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

const db = drizzle(new Database(".data/app.db"));

export const users = sqliteTable("users", {
  id: text("id").primaryKey(),
  name: text("name"),
  age: integer("age").optional()
});

export async function initDb() {
  await db.insert(users).values({ id: "u1", name: "Ada", age: 30 });
  const rows = await db.select().from(users);
  console.log(rows);
}

// If you want to run immediately:
await initDb();
