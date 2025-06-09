const express = require('express');
const router = express.Router();
const Ticket = require('../models/Ticket');
const authenticateToken = require('../middleware/auth');
const multer = require('multer');
const path = require('path');

// File upload setup (local uploads folder)
const upload = multer({ dest: path.join(__dirname, '../uploads/') });

/**
 * USER ROUTES
 */

// Create a new ticket
router.post('/', authenticateToken, async (req, res) => {
  try {
    const ticket = new Ticket({
      ...req.body,
      user: req.user.id
    });
    await ticket.save();
    res.status(201).json(ticket);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get all tickets for authenticated user
router.get('/', authenticateToken, async (req, res) => {
  try {
    const tickets = await Ticket.find({ user: req.user.id }).populate('user', 'name email');
    res.json(tickets);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get a specific ticket for authenticated user
router.get('/:id', authenticateToken, async (req, res) => {
  try {
    const ticket = await Ticket.findOne({ _id: req.params.id, user: req.user.id })
      .populate('user', 'name email')
      .populate('replies.user', 'name email');
    if (!ticket) return res.status(404).json({ message: 'Ticket not found' });
    res.json(ticket);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update a ticket (priority or status) for authenticated user
router.patch('/:id', authenticateToken, async (req, res) => {
  try {
    const ticket = await Ticket.findOne({ _id: req.params.id, user: req.user.id });
    if (!ticket) return res.status(404).json({ message: 'Ticket not found' });

    if (req.body.priority) ticket.priority = req.body.priority;
    if (req.body.status) ticket.status = req.body.status;

    await ticket.save();
    res.json(ticket);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Reply to a ticket (with optional file) for authenticated user
router.post('/:id/reply', authenticateToken, upload.single('file'), async (req, res) => {
  try {
    const ticket = await Ticket.findOne({ _id: req.params.id, user: req.user.id });
    if (!ticket) return res.status(404).json({ message: 'Ticket not found' });

    let fileUrl = null;
    if (req.file) {
      fileUrl = `/uploads/${req.file.filename}`;
    }

    ticket.replies.push({
      user: req.user.id,
      message: req.body.message,
      fileUrl
    });

    await ticket.save();
    res.json({ message: 'Reply added', reply: ticket.replies[ticket.replies.length - 1] });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Serve uploaded files (for demo, not for production)
router.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Delete a ticket for authenticated user
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const ticket = await Ticket.findOneAndDelete({ _id: req.params.id, user: req.user.id });
    if (!ticket) return res.status(404).json({ message: 'Ticket not found' });
    res.json({ message: 'Ticket deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/**
 * ADMIN ROUTES
 */

// Get all tickets (admin)
router.get('/admin/all', authenticateToken, async (req, res) => {
  // You should check req.user.role === 'admin' here!
  try {
    const tickets = await Ticket.find()
      .populate('user', 'name email')
      .populate('replies.user', 'name email');
    res.json(tickets);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get ticket by ID (admin)
router.get('/admin/:id', authenticateToken, async (req, res) => {
  try {
    const ticket = await Ticket.findById(req.params.id)
      .populate('user', 'name email')
      .populate('replies.user', 'name email');
    if (!ticket) return res.status(404).json({ message: 'Ticket not found' });
    res.json(ticket);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update ticket (admin: status, priority, assign agent)
router.patch('/admin/:id', authenticateToken, async (req, res) => {
  try {
    const ticket = await Ticket.findById(req.params.id);
    if (!ticket) return res.status(404).json({ message: 'Ticket not found' });

    if (req.body.priority) ticket.priority = req.body.priority;
    if (req.body.status) ticket.status = req.body.status;
    if (req.body.assignedAgent) ticket.assignedAgent = req.body.assignedAgent;

    await ticket.save();
    res.json(ticket);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Admin reply to a ticket (with optional file)
router.post('/admin/:id/reply', authenticateToken, upload.single('file'), async (req, res) => {
  try {
    const ticket = await Ticket.findById(req.params.id);
    if (!ticket) return res.status(404).json({ message: 'Ticket not found' });

    let fileUrl = null;
    if (req.file) {
      fileUrl = `/uploads/${req.file.filename}`;
    }

    ticket.replies.push({
      user: req.user.id,
      message: req.body.message,
      fileUrl
    });

    await ticket.save();
    res.json({ message: 'Reply added', reply: ticket.replies[ticket.replies.length - 1] });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;