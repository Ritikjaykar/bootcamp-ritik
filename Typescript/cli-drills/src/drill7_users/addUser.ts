import { db, users } from "../drill5_sqlite";
import { nanoid } from "nanoid";

export async function addUser(opts: { name: string }) {
  await db.insert(users).values({ id: nanoid(), name: opts.name });
  console.log(`Added user: ${opts.name}`);
}
