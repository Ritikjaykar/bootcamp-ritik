function authMiddleware(req, res, next) {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ error: 'Missing token' });
  
    jwt.verify(token, SECRET, (err, decoded) => {
      if (err) return res.status(401).json({ error: 'Invalid token' });
      req.user = decoded;
      next();
    });
  }
  
  app.get('/profile', authMiddleware, (req, res) => {
    res.json({ message: 'Welcome', user: req.user });
  });
  