import express from 'express';
import { openApiSpec } from './users-api.js';  

const app = express();

// Routers for versions
const v1Router = express.Router();
const v2Router = express.Router();

// v1 route
v1Router.get('/users', (req, res) => {
  res.json([{ id: 1, name: 'Alice (v1)' }]);
});

// v2 route
v2Router.get('/users', (req, res) => {
  res.json([
    { id: 1, name: 'Alice (v2)' },
    { id: 2, name: 'Bob (v2)' },
  ]);
});

// Mount versioned routers
app.use('/v1', v1Router);
app.use('/v2', v2Router);

// Serve OpenAPI spec from imported file
app.get('/openapi.json', (req, res) => {
  res.json(openApiSpec);
});

app.listen(3000, () => console.log(' Drill 8 running on port 3000'));
