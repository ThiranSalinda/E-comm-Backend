const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const productRoute = require("./routes/product");
const cartRoute = require("./routes/cart");
const summaryRoute = require("./routes/summary");
const cors = require("cors");

dotenv.config();

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("DBconnection successfull!!"))
  .catch((err) => {
    console.log(err);
  });

app.use(express.json());
app.use("/api/product", productRoute);
app.use("/api/cart", cartRoute);
app.use("/api/summary", summaryRoute);

app.listen(process.env.PORT || 8080, () => {
  console.log("Backend server is running.");
});
