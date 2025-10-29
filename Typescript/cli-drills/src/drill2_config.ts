import "dotenv/config";
import fs from "fs-extra";
import YAML from "yaml";
import { z } from "zod";

const EnvSchema = z.object({
  PORT: z.coerce.number().default(3000),
  NODE_ENV: z.enum(["development", "production", "test"]).default("development"),
  LOG_LEVEL: z.enum(["info","debug"]).optional()
});
export const env = EnvSchema.parse(process.env);

const ConfigSchema = z.object({
  dbPath: z.string().default(".data/app.db"),
  logLevel: z.enum(["info","debug"]).optional()
});
export function loadConfig() {
  const yamlText = fs.readFileSync("config.yaml", "utf-8");
  const yamlData = YAML.parse(yamlText);
  return ConfigSchema.parse(yamlData);
}
export function checkConfig() {
  const config = loadConfig();
  console.log("Config loaded:", config);
}
