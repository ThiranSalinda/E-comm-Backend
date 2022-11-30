const mongoose = require("mongoose");
const { Schema } = mongoose;

const OrderSchema = new mongoose.Schema(
  {
    totalCost: { type: Number, required: true },
    products: [{ type: Schema.Types.ObjectId, ref: "Product" }],
  },
  { timestamps: true }
);
module.exports = mongoose.model("Order", OrderSchema);
