import pino from 'pino';
import { randomUUID } from 'crypto';

const logger = pino({ level: 'info' });

export const requestLogger = (req, res, next) => {
  const id = randomUUID();
  const start = Date.now();
  req.id = id;

  res.on('finish', () => {
    const duration = Date.now() - start;
    logger.info({
      id,
      method: req.method,
      url: req.url,
      status: res.statusCode,
      duration: `${duration}ms`,
    });
  });

  next();
};
