require("dotenv").config();

const express = require("express");
const cors = require("cors");
// Importing the config file

const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const uploadRoutes = require("./routes/uploadRoutes")
const protect = require("./middleware/authMiddleware");
const itineraryRoutes = require("./routes/itineraryRoutes");
// Create our server
const app = express();

connectDB();

// Allow front-end talk to back-end
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://trrip-ai-itinerary-generator.vercel.app",
      "https://trrip-ai-itinerary-generator-parthkpanchals-projects.vercel.app",
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// Understand JSON data sent by frontend.
app.use(express.json());

// For Login and Registeration
app.use("/api/auth",authRoutes);

// for uploading files
app.use("/api/upload",uploadRoutes);

// Read file which is uploaded in upload folder
app.use("/api/itinerary", itineraryRoutes);

// to verify by middleware is loggined user or not
app.get("/api/profile", protect, (req, res) => {
  res.json({
    message: "Welcome User",
    user: req.user,
  });
});

app.get("/", (req, res) => {
  res.send("Server is runnning");
});

const PORT = process.env.PORT || 10000;

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
