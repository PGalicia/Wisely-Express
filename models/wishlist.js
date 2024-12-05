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
  // @TODO: Might need to limit this to specific numbers (maybe 1 - 5)
  priority: {
    type: Number,
    default: 3,
  },
  // @TODO: For the following two below, I should try to make it not have a negative number
  targetAmount: {
    type: Number,
    required: true,
  },
  // @TODO: I need to make sure this doesn't exceed the targetAmount
  currentAmount: {
    type: Number,
    default: 0,
  },
});

const Wishlist = mongoose.model("Wishlist", wishlistSchema);

exports.Wishlist = Wishlist;