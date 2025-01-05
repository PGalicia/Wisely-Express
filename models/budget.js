const mongoose = require("mongoose");

const budgetSchema = new mongoose.Schema({
  total: {
    type: Number,
    required: true,
    min: [0, 'Target amount cannot be negative']
  },
});

const Budget = mongoose.model("Budget", budgetSchema);

exports.Budget = Budget;