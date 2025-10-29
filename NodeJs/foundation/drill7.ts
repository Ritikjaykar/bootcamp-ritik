import http from "http";

const server = http.createServer((req, res) => {
  res.end("Hello from Drill 7!");
});

server.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
process.on("SIGINT", () => {
    console.log("\nSIGINT received (Ctrl+C). Shutting down gracefully...");
    server.close(() => {
      console.log("Server closed. Goodbye!");
      process.exit(0);
    });
  });
  
  process.on("SIGTERM", () => {
    console.log("SIGTERM received. Shutting down gracefully...");
    server.close(() => {
      console.log("Server closed. Goodbye!");
      process.exit(0);
    });
  });
  process.on("exit", (code) => {
    console.log(`Process exiting with code ${code}. Goodbye!`);
  });
  
  console.log("Running script...");
  process.exit(0);
  