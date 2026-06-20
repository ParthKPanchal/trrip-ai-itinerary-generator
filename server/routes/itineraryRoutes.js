const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");

const {
  generateItinerary,
  getUserItineraries,
  getSingleItinerary,
  deleteItinerary,
  shareItinerary,
} = require("../controllers/itineraryController");

console.log("protect =", protect);
console.log("upload =", upload);
console.log("generateItinerary =", generateItinerary);

router.post(
  "/generate",
  protect,
  upload.single("document"),
  generateItinerary
);

router.get("/share/:id", shareItinerary);

router.get("/", protect, getUserItineraries);

router.get("/:id", protect, getSingleItinerary);

router.delete("/:id", protect, deleteItinerary);

module.exports = router;