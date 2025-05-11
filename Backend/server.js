const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(bodyParser.json());

const URL = process.env.MONGODB_URL;

mongoose.connect(URL)
  .then(() => {
    console.log("MongoDB Connection success!");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });

// Import auth routes
const authRoutes = require('./routes/auth');

// Register auth routes with '/api' prefix
app.use('/api', authRoutes);

app.listen(PORT, () => {
  console.log(`Server is up and running on port number: ${PORT}`);
});
