const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const rateLimit = require("express-rate-limit");

const app = express();

// 1️. Helmet: Secure HTTP headers
app.use(helmet());

// 2️. CORS: Allow specific origins (like your frontend)
app.use(cors({
  origin: "http://localhost:3000", // change if needed
  methods: ["GET", "POST"],
}));

// 3️. Rate Limiting: Limit too many requests from one IP
const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 5, // limit each IP to 5 requests per minute
  message: { error: "Too many requests, please try again later." }
});
app.use(limiter);

// 4. A simple route
app.get("/", (req, res) => {
  res.json({ message: "Secure middleware drill 6 running!" });
});

// 5. Start the server
app.listen(3000, () => {
  console.log("Drill 6 server running at http://localhost:3000");
});
