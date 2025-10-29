import express from 'express';
import dotenv from 'dotenv';
import { z } from 'zod';

dotenv.config();
const app = express();
app.use(express.json());

// Reusable validator middleware
const validateBody = (schema) => (req, res, next) => {
  const result = schema.safeParse(req.body);
  if (!result.success) {
    return res.status(400).json({ errors: result.error.errors });
  }
  next();
};

// Reusable validator for query params
const validateQuery = (schema) => (req, res, next) => {
  const result = schema.safeParse(req.query);
  if (!result.success) {
    return res.status(400).json({ errors: result.error.errors });
  }
  next();
};

// Zod schema for user
const userSchema = z.object({
  id: z.string(),
  name: z.string().min(1),
  age: z.number().min(0),
  role: z.string().optional(),
});

// Zod schema for query
const searchSchema = z.object({
  q: z.string().min(1),
});

// POST /users with body validation
app.post('/users', validateBody(userSchema), (req, res) => {
  res.status(201).json({ user: req.body });
});

// GET /search?q=abc with query validation
app.get('/search', validateQuery(searchSchema), (req, res) => {
  res.json({ query: req.query.q });
});

// 404
app.use((req, res) => res.status(404).json({ error: 'Not Found' }));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Drill 4 running on port ${PORT}`));
