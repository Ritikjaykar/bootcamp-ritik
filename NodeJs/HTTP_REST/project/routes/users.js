import express from 'express';
import { userSchema, querySchema } from '../schemas/userSchema.js';
import { validate } from '../middleware/validate.js';

const router = express.Router();
let users = [
  { id: 1, name: 'Alice', email: 'alice@example.com', role: 'admin' },
  { id: 2, name: 'Bob', email: 'bob@example.com', role: 'user' },
];

// GET /users — list with pagination & filtering
router.get('/', validate(querySchema), (req, res) => {
  const { page, limit, role } = req.validated;
  let filtered = role ? users.filter(u => u.role === role) : users;
  const start = (page - 1) * limit;
  const paginated = filtered.slice(start, start + limit);

  res.json({
    data: paginated,
    total: filtered.length,
    page,
    limit,
  });
});

// GET /users/:id
router.get('/:id', (req, res) => {
  const user = users.find(u => u.id === parseInt(req.params.id));
  if (!user)
    return res.status(404).json({
      type: 'https://example.com/not-found',
      title: 'User Not Found',
      status: 404,
      detail: `No user with id ${req.params.id}`,
    });
  res.json(user);
});

// POST /users
router.post('/', validate(userSchema), (req, res) => {
  const newUser = { id: users.length + 1, ...req.validated };
  users.push(newUser);
  res.status(201).json(newUser);
});

// PUT /users/:id
router.put('/:id', validate(userSchema), (req, res) => {
  const idx = users.findIndex(u => u.id === parseInt(req.params.id));
  if (idx === -1)
    return res.status(404).json({
      type: 'https://example.com/not-found',
      title: 'User Not Found',
      status: 404,
      detail: `No user with id ${req.params.id}`,
    });
  users[idx] = { ...users[idx], ...req.validated };
  res.json(users[idx]);
});

// DELETE /users/:id
router.delete('/:id', (req, res) => {
  const idx = users.findIndex(u => u.id === parseInt(req.params.id));
  if (idx === -1)
    return res.status(404).json({
      type: 'https://example.com/not-found',
      title: 'User Not Found',
      status: 404,
      detail: `No user with id ${req.params.id}`,
    });
  users.splice(idx, 1);
  res.status(204).send();
});

export default router;
