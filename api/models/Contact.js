const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  phone: {
    type: Number
  },
  email: {
    type: String
  }
});

module.exports = mongoose.model('Contact', contactSchema);
