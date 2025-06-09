const express = require('express');
const router = express.Router();
const Ticket = require('../models/Ticket');
const authenticateToken = require('../middleware/auth');

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
    const tickets = await Ticket.find({ user: req.user.id });
    res.json(tickets);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get a specific ticket
router.get('/:id', authenticateToken, async (req, res) => {
  try {
    const ticket = await Ticket.findOne({ _id: req.params.id, user: req.user.id });
    if (!ticket) return res.status(404).json({ message: 'Ticket not found' });
    res.json(ticket);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update a ticket
router.put('/:id', authenticateToken, async (req, res) => {
  try {
    const ticket = await Ticket.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      req.body,
      { new: true }
    );
    if (!ticket) return res.status(404).json({ message: 'Ticket not found' });
    res.json(ticket);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a ticket
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const ticket = await Ticket.findOneAndDelete({ _id: req.params.id, user: req.user.id });
    if (!ticket) return res.status(404).json({ message: 'Ticket not found' });
    res.json({ message: 'Ticket deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;