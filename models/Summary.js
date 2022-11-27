const mongoose = require("mongoose");

const SummarySchema = new mongoose.Schema(
  {
    userId: { type: String, requird: true },
    products: [
      {
        productId: { type: String },
        quantity: { type: Number, default: 1 },
      },
    ],
    amount: { type: Number, requird: true },
  },
  { timestamps: true }
);

module.exports = mongoose.Schema("Summary", SummarySchema);
