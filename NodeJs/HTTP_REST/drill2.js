
import express from 'express';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
app.use(express.json());

// GET /users/:id
app.get('/users/:id', (req, res) => {
  res.json({ id: req.params.id });
});

// GET /search?q=abc
app.get('/search', (req, res) => {
  const { q } = req.query;
  res.json({ query: q });
});

// POST /users
app.post('/users', (req, res) => {
  res.json({ received: req.body });
});

// Router grouping
const userRouter = express.Router();
userRouter.get('/:id', (req, res) => res.json({ id: req.params.id }));
app.use('/grouped-users', userRouter);

// 404
app.use((req, res) => res.status(404).json({ error: 'Not Found' }));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Drill 2 running on port ${PORT}`));
