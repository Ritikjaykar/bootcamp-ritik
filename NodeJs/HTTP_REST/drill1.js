import express from 'express';
import dotenv from 'dotenv';
dotenv.config();

const app = express();

// Middleware: log method and URL
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// Routes
app.get('/', (req, res) => res.send('Hello World'));
app.get('/ping', (req, res) => res.json({ ok: true }));

// 404 for unknown routes
app.use((req, res) => res.status(404).json({ error: 'Not Found' }));

// Listen
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
