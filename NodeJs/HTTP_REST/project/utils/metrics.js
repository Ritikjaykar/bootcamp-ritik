export const metrics = {
    totalRequests: 0,
    perRoute: {},
  };
  
  export const metricsMiddleware = (req, res, next) => {
    metrics.totalRequests++;
    metrics.perRoute[req.path] = (metrics.perRoute[req.path] || 0) + 1;
    next();
  };
  