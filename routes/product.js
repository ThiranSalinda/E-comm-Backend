const router = require("express").Router();
const Product = require("../models/Product");

//Create/ Add new Products

router.post("/", async (req, res) => {
  const newProduct = new Product(req.body);

  try {
    const savedProduct = await newProduct.save();
    res.status(200).json(savedProduct);
    console.log("New item added");
  } catch (err) {
    res.status(500).json(err);
    console.log(err);
  }
});

//Get Products

router.get("/find/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.body.id);
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json(err);
  }
});

//Get All Products

router.get("/", async (req, res) => {
  const qNew = req.query.new;
  const qCotegory = req.query.category;

  try {
    let products;
    if (qNew) {
      products = await Product.find().sort({ createdAt: -1 }).limit(5);
    } else if (qCotegory) {
      products = await Product.find({
        categories: {
          $in: [qCotegory],
        },
      });
    } else {
      products = await Product.find();
    }

    res.status(200).json(products);
  } catch (err) {
    res.status(500).json(err);
    console.log(err);
  }
});

//Update Products

router.put("/:id", async (req, res) => {
  try {
    const updateProduct = await Product.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    console.log(req.params.id);
    res.status(200).json(updateProduct);
  } catch (err) {
    res.status(500).json(err);
  }
});

//Delete Products

router.delete("/id", async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.body.id);
    res.status(200).json("Product has been deleted!");
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
