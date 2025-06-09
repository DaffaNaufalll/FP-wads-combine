const express = require('express');
const router = express.Router();
const Ticket = require('../models/Ticket');
const authenticateToken = require('../middleware/auth');

router.get('/admin/summary', authenticateToken, async (req, res) => {
  // Check req.user.role === 'admin'
  try {
    const total = await Ticket.countDocuments();
    const pending = await Ticket.countDocuments({ status: "Open" });
    const onHold = await Ticket.countDocuments({ status: "Pending" });
    const completed = await Ticket.countDocuments({ status: "Closed" });
    res.json({ total, pending, onHold, completed });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;