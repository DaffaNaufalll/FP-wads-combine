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

// User Schema
const userSchema = new mongoose.Schema({
  email: String,
  password: String, // NOTE: Hash in production!
  role: String
});
const User = mongoose.model('User', userSchema);

// Ticket Schema (now includes priority)
const ticketSchema = new mongoose.Schema({
  title: String,
  description: String,
  priority: { type: String, default: "Low" }, // <-- added priority!
  status: { type: String, default: "open" },
  createdBy: String, // user's email or user id
  createdAt: { type: Date, default: Date.now }
});
const Ticket = mongoose.model('Ticket', ticketSchema);

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

// Create Ticket (expects user email in body)
app.post('/api/tickets', async (req, res) => {
  const { title, description, priority, email } = req.body; // <-- now expects priority from frontend
  if (!email) return res.status(400).json({ error: 'Missing user email' });
  try {
    const ticket = await Ticket.create({ title, description, priority, createdBy: email }); // <-- includes priority
    res.json({ message: 'Ticket created', ticket });
  } catch (err) {
    res.status(500).json({ error: 'Ticket creation failed', details: err });
  }
});

// Get "My Tickets" (by email, pass email as query or in token)
app.get('/api/my-tickets', async (req, res) => {
  const { email } = req.query; // or get email from token
  if (!email) return res.status(400).json({ error: 'Missing user email' });
  try {
    const tickets = await Ticket.find({ createdBy: email }).sort({ createdAt: -1 });
    res.json(tickets);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch tickets', details: err });
  }
});

app.get('/', (req, res) => {
  res.send('API is running!');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});