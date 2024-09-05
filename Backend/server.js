const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;
const JWT_SECRET = process.env.JWT_SECRET || 'jwt ki key daal dena'; 
const MONGO_URI = process.env.MONGO_URI || 'connection string daal dena ';

// Middleware
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Schema decide kr lena diff diff 
const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

const User = mongoose.model('User', UserSchema);

// Signup route
app.post('/signup', async (req, res) => {
  try {
    const { username, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create and save new user
    const newUser = new User({ username, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error signing up', error: error.message });
  }
});

// Signin route
app.post('/signin', async (req, res) => {
  try {
    const { username, password } = req.body;

    // Find user
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Check password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Generate JWT
    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1h' });

    res.json({ message: 'Signed in successfully', token });
  } catch (error) {
    res.status(500).json({ message: 'Error signing in', error: error.message });
  }
});

// Protected route example
app.get('/protected', authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.userId).select('-password');
    res.json({ message: 'Access granted to protected route', user });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching user data', error: error.message });
  }
});

// Middleware to authenticate JWT
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.status(401).json({ message: 'Authentication token required' });

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) return res.status(403).json({ message: 'Invalid or expired token' });
    req.userId = decoded.userId;
    next();
  });
}

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

//To check whether anyone is logged in or not
function isLoggedIn() {
  const token = localStorage.getItem('token');
  return token !== null;
}

// Example usage
if (isLoggedIn()) {
  console.log('User is logged in');
} else {
  console.log('User is not logged in');
}



// //
// fetch('http://example:300/signin', {
//   method: 'POST',
//   headers: {
//     'Content-Type': 'application/json'
//   },
//   body: JSON.stringify({ email: 'user@example.com', password: 'password123' })
// })
// .then(response => response.json())
// .then(data => {
//   if (data.token) {
//     // yah pe token store ho rha h localStorage me
//     localStorage.setItem('token', data.token);
//   } else {
//     console.error('Sign-in failed:', data.error);
//   }
// });

