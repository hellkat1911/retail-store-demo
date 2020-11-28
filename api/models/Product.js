const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  category: {
    type: String,
    enum: ['books', 'electronics', 'kitchen appliances', 'home decor', 'automotive']
  },
  stock: {
    type: Number,
    required: true
  },
  locations: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'ProductCenter'
    }
  ],
  image: {
    type: String
  }
});

module.exports = mongoose.model('Product', productSchema);
