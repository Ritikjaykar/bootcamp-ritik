import express from 'express';
import dotenv from 'dotenv';
import { z } from 'zod';
dotenv.config();

const app = express();
app.use(express.json());

// In-memory store
let users = [];

// Zod schema
const userSchema = z.object({
  id: z.string(),
  name: z.string(),
  age: z.number().min(0),
  role: z.string().optional(),
});

// Helper: RFC 7807 error format
const problemDetail = ({ type = 'about:blank', title, status, detail }) => ({
  type,
  title,
  status,
  detail,
});

// Middleware: validate body
const validateBody = (schema) => (req, res, next) => {
  const result = schema.safeParse(req.body);
  if (!result.success) {
    return next({
      status: 400,
      title: 'Validation Error',
      detail: JSON.stringify(result.error.errors),
    });
  }
  next();
};

// Routes
app.post('/users', validateBody(userSchema), (req, res) => {
  users.push(req.body);
  res.status(201).json(req.body);
});

app.get('/users/:id', (req, res, next) => {
  const user = users.find(u => u.id === req.params.id);
  if (!user) return next({ status: 404, title: 'Not Found', detail: `User ${req.params.id} not found` });
  res.json(user);
});

// PUT / DELETE similar to GET with error handling
app.put('/users/:id', validateBody(userSchema), (req, res, next) => {
  const index = users.findIndex(u => u.id === req.params.id);
  if (index === -1) return next({ status: 404, title: 'Not Found', detail: `User ${req.params.id} not found` });
  users[index] = req.body;
  res.json(users[index]);
});

app.delete('/users/:id', (req, res, next) => {
  const index = users.findIndex(u => u.id === req.params.id);
  if (index === -1) return next({ status: 404, title: 'Not Found', detail: `User ${req.params.id} not found` });
  users.splice(index, 1);
  res.status(204).send();
});

// 404 for unknown routes
app.use((req, res, next) => next({ status: 404, title: 'Not Found', detail: `Route ${req.originalUrl} not found` }));

// Global error-handling middleware
app.use((err, req, res, next) => {
  const { status = 500, title = 'Internal Server Error', detail = err.message || '' } = err;
  res.status(status).json(problemDetail({ status, title, detail }));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Drill 6 running on port ${PORT}`));
