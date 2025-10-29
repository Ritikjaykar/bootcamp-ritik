import express from 'express';
import pino from 'pino';
import { v4 as uuidv4 } from 'uuid';

const app = express();
app.use(express.json());

// 1️ Structured logging
const logger = pino({ level: 'info' });

// 2️ Unique request IDs
app.use((req, res, next) => {
  req.id = uuidv4();
  next();
});

// 3️ Measure latency + log details
app.use((req, res, next) => {
  const start = Date.now();
  res.on('finish', () => {
    const duration = Date.now() - start;
    logger.info(
      {
        id: req.id,
        method: req.method,
        url: req.url,
        status: res.statusCode,
        duration: `${duration}ms`,
      },
      'Request completed'
    );
  });
  next();
});

// 4️ Count requests per route
const metrics = { requests: {} };
app.use((req, res, next) => {
  res.on('finish', () => {
    metrics.requests[req.url] = (metrics.requests[req.url] || 0) + 1;
  });
  next();
});

// Routes
app.get('/', (req, res) => res.send('Hello Drill 7'));
app.get('/users', (req, res) => res.json([{ id: 1, name: 'Ritik' }]));

// 5️ /metrics endpoint
app.get('/metrics', (req, res) => res.json(metrics));

// 404 handler
app.use((req, res) => res.status(404).json({ error: 'Not Found' }));

// Start server
app.listen(3000, () => console.log('Drill 7 running on port 3000'));
