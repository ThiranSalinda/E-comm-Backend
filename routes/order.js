const router = require("express").Router();
const Cart = require("../models/Cart");
const Order = require("../models/Order");

router.post("/", async (req, res) => {
  try {
    const cartItems = await Cart.find().sort({ createdAt: -1 });

    const newOrder = new Order({
      totalCost: req.body.totalCost,
      products: cartItems,
    });

    const savedOrder = await newOrder.save();

    if (savedOrder) {
      await Cart.remove({});
    }

    res.status(200).json(savedOrder);
    // console.log(cartItems);
  } catch (err) {
    // res.status(500).json(err);
    console.log(err);
  }
});
module.exports = router;
