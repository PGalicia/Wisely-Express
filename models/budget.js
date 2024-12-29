const mongoose = require("mongoose");

const budgetSchema = new mongoose.Schema({
  total: {
    type: Number,
    required: true,
  },
});

const Budget = mongoose.model("Budget", budgetSchema);

exports.Budget = Budget;