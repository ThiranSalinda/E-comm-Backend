const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema(
  {
    productId: { type: String },
    quantity: { type: Number, default: 1 },
  },
  { timeseries: true }
);

module.exports = mongoose.model("Cart", CartSchema);
