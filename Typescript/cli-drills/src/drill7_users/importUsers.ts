import fs from "fs";
import { parse } from "csv-parse/sync";
import { db, users } from "../drill5_sqlite";
import { nanoid } from "nanoid";

export async function importUsers(file: string) {
  const text = fs.readFileSync(file, "utf-8");
  const rows = parse(text, { columns: true });
  for (const row of rows) {
    await db.insert(users).values({ id: nanoid(), name: row.name, age: row.age ? Number(row.age) : undefined });
  }
  console.log("Imported users:", rows.length);
}
