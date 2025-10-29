import express from 'express';
import usersRouter from './routes/users.js';
import { requestLogger } from './middleware/logger.js';
import { metricsMiddleware, metrics } from './utils/metrics.js';
import { errorHandler } from './middleware/errorHandler.js';

const app = express();
app.use(express.json());
app.use(requestLogger);
app.use(metricsMiddleware);

app.get('/', (req, res) => res.send(' User Service API Running'));

// Mount users router
app.use('/users', usersRouter);

// Metrics endpoint
app.get('/metrics', (req, res) => res.json(metrics));

// Global error handler
app.use(errorHandler);

app.listen(3000, () => console.log(' usersvc running on port 3000'));
