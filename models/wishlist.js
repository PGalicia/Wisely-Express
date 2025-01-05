const mongoose = require("mongoose");

const wishlistSchema = new mongoose.Schema({
  itemName: {
    type: String,
    required: true,
  },
  itemLink: {
    type: String,
    default: '',
  },
  itemDescription: {
    type: String,
    default: '',
  },
  priority: {
    type: Number,
    default: 3,
    min: [1, 'Priority must be at least 1'],
    max: [5, 'Priority must be at most 5'], 
  },
  targetAmount: {
    type: Number,
    required: true,
    min: [0, 'Target amount cannot be negative']
  },
  isComplete: {
    type: Boolean,
    default: false,
  },
});

const Wishlist = mongoose.model("Wishlist", wishlistSchema);

exports.Wishlist = Wishlist;