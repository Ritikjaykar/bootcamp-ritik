export const errorHandler = (err, req, res, next) => {
    console.error(' Error:', err);
  
    const status = err.status || 500;
    res.status(status).json({
      type: 'https://example.com/internal-error',
      title: err.title || 'Internal Server Error',
      status,
      detail: err.message || 'Something went wrong',
      instance: req.originalUrl,
    });
  };
  