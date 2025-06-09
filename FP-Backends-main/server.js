require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected!'))
.catch((err) => console.error('MongoDB connection error:', err));

// Import routes
const ticketRoutes = require('./routes/ticket');

// Use ticket routes (all /api/tickets and related endpoints)
app.use('/api/tickets', ticketRoutes);

// User Schema (for registration/login demo)
const userSchema = new mongoose.Schema({
  email: String,
  password: String, // NOTE: Hash in production!
  role: String
});
const User = mongoose.model('User', userSchema);

// User registration (for testing/demo)
app.post('/api/register', async (req, res) => {
  const { email, password, role } = req.body;
  try {
    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ error: 'User already exists' });
    const user = await User.create({ email, password, role });
    res.json({ message: 'User registered!', user });
  } catch (err) {
    res.status(500).json({ error: 'Registration failed', details: err });
  }
});

// User login
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email, password });
    if (!user) return res.status(401).json({ error: 'Invalid credentials' });
    // In production, generate JWT
    res.json({ token: 'mock-token', role: user.role, email: user.email });
  } catch (err) {
    res.status(500).json({ error: 'Login failed', details: err });
  }
});

app.get('/', (req, res) => {
  res.send('API is running!');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});