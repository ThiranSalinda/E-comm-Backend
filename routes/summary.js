const router = require("express").Router();
// const Summary = require("../models/Summary");

// // Create/ Add new Summarys

// router.post("/", async (req, res) => {
//   const newSummary = new Summary(req.body);

//   try {
//     const savedSummary = await newSummary.save();
//     res.status(200).json(savedSummary);
//     console.log("New item added");
//   } catch (err) {
//     res.status(500).json(err);
//     console.log(err);
//   }
// });

// //Update Summary

// router.put("/:id", async (req, res) => {
//   try {
//     const updateSummary = await Summary.findByIdAndUpdate(
//       req.body.id,
//       {
//         $set: req.body,
//       },
//       { new: true }
//     );
//     res.status(200).json(updateSummary);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

// //Delete Summary

// router.delete("/id", async (req, res) => {
//   try {
//     await Summary.findByIdAndDelete(req.body.id);
//     res.status(200).json("Summary has been deleted!");
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

// //Get User Summary

// router.get("/find/:userId", async (req, res) => {
//   try {
//     const summary = await Summary.findOne({ userId: req.params.id });
//     res.status(200).json(summary);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

// //Get All Products

// router.get("/", async (req, res) => {
//   try {
//     const carts = await Cart.find();
//     res.status(200).json(carts);
//   } catch (err) {
//     res.status(500).json(err);
//     console.log(err);
//   }
// });
module.exports = router;
