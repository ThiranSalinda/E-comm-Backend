const mongoose = require("mongoose");
const { Schema } = mongoose;

const CartSchema = Schema(
  {
    product: { type: Schema.Types.ObjectId, ref: "Product" },
    quantity: { type: Number, default: 1 },
  },
  { timeseries: true }
);

module.exports = mongoose.model("Cart", CartSchema);
