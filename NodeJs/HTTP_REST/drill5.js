import express from 'express';
import dotenv from 'dotenv';
import { z } from 'zod';
dotenv.config();

const app = express();
app.use(express.json());

// In-memory user store
let users = [];

// Zod schema for user
const userSchema = z.object({
  id: z.string(),
  name: z.string(),
  age: z.number().min(0),
  role: z.string().optional(),
});

// Middleware: validate POST/PUT body
const validateBody = (schema) => (req, res, next) => {
  const result = schema.safeParse(req.body);
  if (!result.success) return res.status(400).json({ errors: result.error.errors });
  next();
};

// GET /users?role=admin&page=1&limit=10
app.get('/users', (req, res) => {
  const { role, page = 1, limit = 10 } = req.query;
  let filtered = role ? users.filter(u => u.role === role) : users;
  const start = (page - 1) * limit;
  const paginated = filtered.slice(start, start + +limit);
  res.json(paginated);
});

// POST /users
app.post('/users', validateBody(userSchema), (req, res) => {
  users.push(req.body);
  res.status(201).json(req.body);
});

// GET /users/:id
app.get('/users/:id', (req, res) => {
  const user = users.find(u => u.id === req.params.id);
  if (!user) return res.status(404).json({ error: 'User not found' });
  res.json(user);
});

// PUT /users/:id
app.put('/users/:id', validateBody(userSchema), (req, res) => {
  const index = users.findIndex(u => u.id === req.params.id);
  if (index === -1) return res.status(404).json({ error: 'User not found' });
  users[index] = req.body;
  res.json(users[index]);
});

// DELETE /users/:id
app.delete('/users/:id', (req, res) => {
  const index = users.findIndex(u => u.id === req.params.id);
  if (index === -1) return res.status(404).json({ error: 'User not found' });
  users.splice(index, 1);
  res.status(204).send();
});

// 404
app.use((req, res) => res.status(404).json({ error: 'Not Found' }));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Drill 5 running on port ${PORT}`));
