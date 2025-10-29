// src/utils.ts
import dotenv from "dotenv";
dotenv.config();

export function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) throw new Error(`Missing required environment variable: ${name}`);
  return value;
}

export const PORT = process.env.PORT || 3000;
export const API_KEY = requireEnv("API_KEY");
