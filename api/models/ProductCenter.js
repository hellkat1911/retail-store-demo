const mongoose = require('mongoose');

const productCenterSchema = new mongoose.Schema({
  location: {
    city: {
      type: String,
      required: true
    },
    state: {
      type: String,
      maxlength: 2,
      required: true
    },
    zip: {
      type: Number,
      max: 99999,
      required: true
    }
  },
  contact: {
    type: mongoose.Schema.ObjectId,
    ref: 'Contact'
  }
});

module.exports = mongoose.model('ProductCenter', productCenterSchema);
