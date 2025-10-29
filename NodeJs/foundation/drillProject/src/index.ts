// src/index.ts
import { PORT, API_KEY, requireEnv } from "./utils";

console.log("Process ID:", process.pid);
console.log("Node Version:", process.version);
console.log("Working Directory:", process.cwd());
console.log("PORT:", PORT);
console.log("API_KEY:", API_KEY);

// Accept CLI arguments
const args = process.argv.slice(2);
console.log("Arguments:", args.length ? args : "No arguments provided");

// Debug example
// debugger;

// Handle signals
process.on("SIGINT", () => {
  console.log("\nSIGINT received. Shutting down gracefully...");
  process.exit(0);
});

process.on("SIGTERM", () => {
  console.log("SIGTERM received. Shutting down gracefully...");
  process.exit(0);
});
