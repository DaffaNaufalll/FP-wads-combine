const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
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
  },
  role: {
    type: String,
    default: "user"
  },
  active: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Prevent OverwriteModelError in dev/hot-reload
module.exports = mongoose.models.User || mongoose.model('User', UserSchema);