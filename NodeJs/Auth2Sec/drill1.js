const express = require('express');
const app = express();
app.use(express.json());

const USER = { username: 'admin', password: '1234', role: 'admin' };

app.post('/login', (req, res) => {
  const { username, password } = req.body;
  if (username === USER.username && password === USER.password) {
    res.json({ message: 'Login successful', user: USER });
  } else {
    res.status(401).json({ error: 'Invalid credentials' });
  }
});

app.listen(3000, () => console.log('Server running on http://localhost:3000'));
