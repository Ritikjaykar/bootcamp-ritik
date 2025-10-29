const express = require("express");
const jwt = require("jsonwebtoken");
const rateLimit = require("express-rate-limit");
const app = express();

app.use(express.json());

// 1️. Rate limiter for login attempts
const loginLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 5, // 5 tries per minute per IP
  message: { error: "Too many login attempts. Try again later." },
});
app.use("/login", loginLimiter);

// 2️. Mock login route
app.post("/login", (req, res) => {
  const { username, password } = req.body;
  if (username !== "admin" || password !== "secret") {
    console.log(`Failed login from IP: ${req.ip}`);
    return res.status(401).json({ error: "Invalid credentials" });
  }

  const token = jwt.sign({ id: 1, role: "admin" }, "supersecret", { expiresIn: "15m" });
  res.json({ token });
});

// 3️. Middleware for error catching
app.use((err, req, res, next) => {
  console.error("Error:", err.message);
  res.status(500).json({ error: "Something went wrong. Please try again later." });
});

// 4️. Start server
app.listen(3000, () => console.log(" Drill 7 running on http://localhost:3000"));
