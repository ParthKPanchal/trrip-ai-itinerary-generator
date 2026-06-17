require("dotenv").config();

console.log("ENV TEST:", process.env.MONGO_URL);
const express = require("express");
const cors = require("cors");
// Importing the config file

const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");

// Create our server
const app = express();

connectDB();

// Allow front-end talk to back-end
app.use(cors());

// Understand JSON data sent by frontend.
app.use(express.json());

app.use("/api/auth",authRoutes);

app.get("/", (req, res) => {
  res.send("Server is runnning");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
