const express = require('express');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');

const app = express();
app.use(express.json());
app.use(cookieParser());

const SECRET = 'mysecretkey';

//  Step 1: Login and set token in cookie
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  if ((username === 'admin' || username === 'user') && password === '1234') {
    const role = username === 'admin' ? 'admin' : 'user';
    const token = jwt.sign({ id: Date.now(), username, role }, SECRET, { expiresIn: '2m' });

    // Set token as HttpOnly cookie
    res.cookie('token', token, {
      httpOnly: true, // cannot be accessed by JS in browser
      secure: false,  // true only when using HTTPS
      maxAge: 2 * 60 * 1000 // 2 minutes
    });

    res.json({ message: 'Logged in successfully using cookies!' });
  } else {
    res.status(401).json({ error: 'Invalid credentials' });
  }
});

//  Step 2: Middleware to verify JWT from cookie
function authenticateCookie(req, res, next) {
  const token = req.cookies.token;
  if (!token) return res.status(401).json({ error: 'Missing auth cookie' });

  jwt.verify(token, SECRET, (err, decoded) => {
    if (err) return res.status(403).json({ error: 'Invalid or expired token' });
    req.user = decoded;
    next();
  });
}

//  Step 3: Logout (clear cookie)
app.post('/logout', (req, res) => {
  res.clearCookie('token');
  res.json({ message: 'Logged out successfully' });
});

//  Step 4: Protected routes using cookie
app.get('/profile', authenticateCookie, (req, res) => {
  res.json({
    message: `Welcome ${req.user.username}!`,
    role: req.user.role
  });
});

app.get('/admin', authenticateCookie, (req, res) => {
  if (req.user.role !== 'admin')
    return res.status(403).json({ error: 'Forbidden: Only admin allowed' });
  res.json({ message: 'Welcome Admin! Access granted.' });
});

//  Step 5: Start server
app.listen(3000, () => console.log('Server running at http://localhost:3000'));
