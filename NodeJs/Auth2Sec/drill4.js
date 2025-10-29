const express = require('express');
const jwt = require('jsonwebtoken');

const app = express();
app.use(express.json());

const SECRET = 'mysecretkey';

//  Step 1: Login route with role included
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  // Example: two types of users
  if (username === 'admin' && password === '1234') {
    const token = jwt.sign({ id: 1, username, role: 'admin' }, SECRET, { expiresIn: '2m' });
    res.json({ token });
  } else if (username === 'user' && password === '1234') {
    const token = jwt.sign({ id: 2, username, role: 'user' }, SECRET, { expiresIn: '2m' });
    res.json({ token });
  } else {
    res.status(401).json({ error: 'Invalid credentials' });
  }
});

//  Step 2: JWT verification middleware
function authenticateToken(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Token missing' });

  jwt.verify(token, SECRET, (err, decoded) => {
    if (err) return res.status(403).json({ error: 'Invalid or expired token' });
    req.user = decoded;
    next();
  });
}

//  Step 3: Role-based middleware
function requireRole(role) {
  return (req, res, next) => {
    if (req.user.role !== role) {
      return res.status(403).json({ error: 'Forbidden: Insufficient privileges' });
    }
    next();
  };
}

// Step 4: Protected routes
app.get('/profile', authenticateToken, (req, res) => {
  res.json({
    message: `Hello ${req.user.username}, this is your profile.`,
    role: req.user.role
  });
});

app.get('/admin', authenticateToken, requireRole('admin'), (req, res) => {
  res.json({
    message: `Welcome ${req.user.username}, you have admin access.`,
    role: req.user.role
  });
});

// Step 5: Start server
app.listen(3000, () => {
  console.log('Server running at http://localhost:3000');
});
