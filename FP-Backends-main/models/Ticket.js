const mongoose = require('mongoose');

// Reply subdocument schema
const replySchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  message: {
    type: String,
    required: true
  },
  fileUrl: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const ticketSchema = new mongoose.Schema({
  subject: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ["Open", "Pending", "Closed"],
    default: "Open"
  },
  priority: {
    type: String,
    enum: ["Low", "Medium", "High"],
    default: "Medium"
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  replies: [replySchema], 
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: Date
  
});

// Prevent OverwriteModelError:
module.exports = mongoose.models.Ticket || mongoose.model('Ticket', ticketSchema);
