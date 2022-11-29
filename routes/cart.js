const router = require("express").Router();
const Cart = require("../models/Cart");
const Product = require("../models/Product");

// Create/ Add new Carts

router.post("/", async (req, res) => {
  try {
    const hasProduct = await Cart.findOne({
      productId: req.body.productId,
    });

    let response = null;
    if (hasProduct) {
      // update qty
      const newQty = hasProduct?.quantity + req?.body?.quantity * 1;
      response = await Cart.updateOne(
        {
          productId: req.body.productId,
        },
        {
          $set: { quantity: newQty },
        }
      );
    } else {
      // add new row
      // const newCart = await Cart(req.body)
      response = await Cart(req.body).save();
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

    const cartItems = await Cart.find().sort({ createdAt: -1 });

    const cartItemsWithProduct = await Promise.all(
      cartItems?.map(async (cart) => {
        const product = await Product.findById(cart?.productId);

        cart["product"] = product?.title;
        console.log(cart);
        console.log("xxxx");
        return cart;
      })
    );
    console.log(cartItemsWithProduct);
    res.status(200).json(cartItemsWithProduct);
  } catch (err) {
    res.status(500).json(err);
    console.log(err);
  }
});
module.exports = router;
