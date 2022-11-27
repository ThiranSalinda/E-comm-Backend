const router = require("express").Router();
const Cart = require("../models/Cart");

// Create/ Add new Carts

router.post("/", async (req, res) => {
  const newCart = new Cart(req.body);

  try {
    const savedCart = await newCart.save();
    res.status(200).json(savedCart);
    console.log("New item added");
  } catch (err) {
    res.status(500).json(err);
    console.log(err);
  }
});

//Update Cart

router.put("/:id", async (req, res) => {
  try {
    const updateCart = await Cart.findByIdAndUpdate(
      req.body.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updateCart);
  } catch (err) {
    res.status(500).json(err);
  }
});

//Delete Cart

router.delete("/id", async (req, res) => {
  try {
    await Cart.findByIdAndDelete(req.body.id);
    res.status(200).json("Cart has been deleted!");
  } catch (err) {
    res.status(500).json(err);
  }
});

//Get User Cart

router.get("/find/:userId", async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.params.id });
    res.status(200).json(cart);
  } catch (err) {
    res.status(500).json(err);
  }
});

//Get All Products

router.get("/", async (req, res) => {
  try {
    const carts = await Cart.find();
    res.status(200).json(carts);
  } catch (err) {
    res.status(500).json(err);
    console.log(err);
  }
});
module.exports = router;
