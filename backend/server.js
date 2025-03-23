const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();

//Middleware
app.use(cors());
app.use(express.json());

//Load Environment Variables
require("dotenv").config();

const URI =
  process.env.NODE_ENV === "production"
    ? process.env.MONGO_URI_PROD
    : process.env.MONGO_URI_DEV;

//Setup MongoDB Connection
mongoose
  .connect(URI)
  .then(() => console.log("Connected to DB"))
  .catch((err) => console.log(err));

//Test Route
app.get("/", (req, res) => {
  res.send("API is working");
});

//Initialize Server on port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
