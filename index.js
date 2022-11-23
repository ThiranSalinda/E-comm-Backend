const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("DBconnection successfull!!"))
  .catch((err) => {
    console.log(err);
  });

app.get("/api/test", () => {
  console.log("test successfull!!");
});

app.listen(process.env.PORT || 8080, () => {
  console.log("Backend server is running.");
});
