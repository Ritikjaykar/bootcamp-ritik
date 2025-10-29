import express from 'express';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
app.use(express.json());

// Middleware: log request duration
app.use((req, res, next) => {
  const start = Date.now();
  res.on('finish', () => {
    console.log(`${req.method} ${req.url} - ${Date.now() - start}ms`);
  });
  next();
});

// Middleware: reject requests without x-api-key
const requireApiKey = (req, res, next) => {
  if (!req.headers['x-api-key']) return res.status(403).json({ error: 'Missing API key' });
  next();
};

// Apply to one route
app.get('/secure', requireApiKey, (req, res) => res.send('Secure route'));

// Order demo middleware
app.use((req, res, next) => {
  console.log('Middleware 1 executed');
  next();
});
app.use((req, res, next) => {
  console.log('Middleware 2 executed');
  next();
});

// Error-handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err.message);
  res.status(500).json({ error: 'Internal Server Error' });
});

// Test route
app.get('/', (req, res) => res.send('Hello Drill 3'));

// 404
app.use((req, res) => res.status(404).json({ error: 'Not Found' }));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Drill 3 running on port ${PORT}`));
