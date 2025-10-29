require("dotenv").config();
const express = require("express");
const jwt = require("jsonwebtoken");

const app = express();
app.use(express.json());

// 1️. Load secret key from .env
const SECRET = process.env.JWT_SECRET;

// 2️. Login route issues token
app.post("/login", (req, res) => {
  const { username, password } = req.body;
  if (username !== "admin" || password !== "secret")
    return res.status(401).json({ error: "Invalid credentials" });

  const token = jwt.sign({ id: 1, role: "admin" }, SECRET, { expiresIn: "10m" });
  res.json({ token });
});

// 3️. Verify token route
app.get("/verify", (req, res) => {
  const auth = req.headers.authorization;
  if (!auth) return res.status(400).json({ error: "Missing token" });

  const token = auth.split(" ")[1];
  try {
    const decoded = jwt.verify(token, SECRET);
    res.json({ message: "Valid token", decoded });
  } catch {
    res.status(401).json({ error: "Invalid or expired token" });
  }
});

// 4️. Server
app.listen(3000, () => console.log(" Drill 8 running on http://localhost:3000"));
