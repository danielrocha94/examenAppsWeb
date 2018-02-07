const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
    trim: true,
  },
  initials: {
    type: String,
    required: true,
    trim: true,
  }
});

const Message = mongoose.model('Message', MessageSchema);

module.exports = Message;
