const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  }
  // Add other fields here if needed (e.g., name, role)
}, {
  timestamps: true
});

module.exports = mongoose.model('User', UserSchema);