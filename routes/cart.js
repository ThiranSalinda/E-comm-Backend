const router = require("express").Router();
const Cart = require("../models/Cart");
const Product = require("../models/Product");

// Create/ Add new Carts

const TAX_AMOUNT = 1.23;
const SHIPPING_AMOUNT = 500;

router.post("/", async (req, res) => {
  try {
    const hasProduct = await Cart.findOne({
      product: req.body.productId,
    });

    let response = null;
    if (hasProduct) {
      // update qty
      const qty = req?.body?.quantity > 1 ? req?.body?.quantity : 1;
      const newQty = hasProduct?.quantity + qty * 1;
      response = await Cart.updateOne(
        {
          product: req.body.productId,
        },
        {
          $set: { quantity: newQty },
        }
      );
    } else {
      // add new row
      // const newCart = await Cart(req.body)
      console.log(req.body);
      response = await Cart({
        product: req?.body?.productId,
        quantity: req?.body?.quantity > 1 ? req?.body?.quantity : 1,
      }).save();
    }

    res.status(200).json(response);
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

router.delete("/:id", async (req, res) => {
  try {
    await Cart.findByIdAndDelete(req.params.id);
    res.status(200).json("Cart has been deleted!");
  } catch (err) {
    res.status(500).json(err);
  }
});

//Delete All Product in Cart

router.delete("/", async (req, res) => {
  try {
    await Cart.remove({});
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
    // const cartItems = await Cart.aggregate([
    //   {
    //     $lookup: {
    //       from: "products",
    //       localField: "_id",
    //       foreignField: "productId",
    //       as: "productDetails",
    //     },
    //   },
    //   // { $unwind: "$productDetails" },
    //   {
    //     $project: {
    //       _id: 1,
    //       price: "$productDetails.price",
    //       quantity: 1,
    //       // "description": "$productDetails.description",
    //       name: "$productDetails.title",
    //     },
    //   },
    // ]);

    const cartItems = await Cart.find()
      .sort({ createdAt: -1 })
      .populate("product");

    // const cartItemsWithProduct = await Promise.all(
    //   cartItems?.map(async (cart) => {
    //     const product = await Product.findById(cart?.productId);

    //     cart["product"] = product?.title;
    //     console.log(cart);
    //     console.log("xxxx");
    //     return cart;
    //   })
    // );
    console.log(cartItems);

    let subTotal = 0;

    cartItems.forEach((item) => {
      const itemSubTotal = item?.quantity * item?.product?.price;
      subTotal += itemSubTotal;
    });

    console.log("subTotal : " + subTotal);

    const taxTotal = (subTotal * TAX_AMOUNT) / 100;
    const shippingCost = SHIPPING_AMOUNT;

    const totalCost = subTotal + taxTotal + shippingCost;

    const data = {
      items: cartItems,
      subTotal,
      taxTotal,
      shippingCost,
      totalCost,
    };

    // console.log(cartItemsWithProduct);
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json(err);
    console.log(err);
  }
});
module.exports = router;
