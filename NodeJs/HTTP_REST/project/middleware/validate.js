export const validate = (schema) => (req, res, next) => {
    try {
      req.validated = schema.parse({
        ...req.body,
        ...req.query,
        ...req.params,
      });
      next();
    } catch (err) {
      res.status(400).json({
        type: 'https://example.com/validation-error',
        title: 'Invalid Request',
        status: 400,
        detail: err.errors.map(e => e.message).join(', '),
      });
    }
  };
  