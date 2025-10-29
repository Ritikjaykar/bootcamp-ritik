const express = require('express');
const jwt = require('jsonwebtoken');
const app = express();
app.use(express.json());

const SECRET = 'mysecretkey';

app.post('/login', (req, res) => {
  const { username, password } = req.body;
  if (username === 'admin' && password === '1234') {
    const token = jwt.sign({ id: 1, username }, SECRET, { expiresIn: '30s' });
    res.json({ token });
  } else {
    res.status(401).json({ error: 'Invalid credentials' });
  }
});

app.get('/verify', (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Missing token' });

  jwt.verify(token, SECRET, (err, decoded) => {
    if (err) return res.status(401).json({ error: 'Invalid or expired token' });
    res.json({ message: 'Token valid', user: decoded });
  });
});

app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
  });
  
