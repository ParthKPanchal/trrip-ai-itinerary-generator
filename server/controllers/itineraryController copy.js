const fs = require("fs");
const pdfParse = require("pdf-parse");

const Itinerary = require("../models/Itinerary");

// Adding data pdf to read from upload folder
const generateItinerary = async (req, res) => {
  try {
    // Check file uploaded or not
    if (!req.file) {
      return res.status(400).json({
        message: "Please upload a PDF file",
      });
    }

    // Get uploaded file path
    const filePath = req.file.path;

    // Read PDF file
    const dataBuffer = fs.readFileSync(filePath);

    // Extract text from PDF
    const pdfData = await pdfParse(dataBuffer);

    console.log("✅ PDF Extracted Successfully");
    console.log("--------------------------------");
    console.log(pdfData.text);
    console.log("--------------------------------");

    // Dummy itinerary until Gemini works
    const itinerary = `
DAY 1 - Arrival in Goa
• Arrive from Mumbai
• Check in at Sea View Resort Goa
• Relax at Calangute Beach

DAY 2 - Adventure
• Scuba Diving

DAY 3 - Dolphin Tour
• Beach Activities

DAY 4 - Sightseeing
• Visit Old Goa
• Local Shopping

DAY 5 - Return to Mumbai
`;

    // Save itinerary in MongoDB
    const savedItinerary = await Itinerary.create({
      user: req.user.userId,
      fileName: req.file.originalname,
      extractedText: pdfData.text,
      itinerary,
    });

    res.status(200).json({
      message: "Itinerary Generated Successfully",
      data: savedItinerary,
    });
  } catch (error) {
    console.log("❌ ERROR OCCURRED:");
    console.log(error);

    res.status(500).json({
      message: error.message,
    });
  }
};

// Give me all itineraries belonging to this user
const getUserItineraries = async (req, res) => {
  try {
    // find all the itineraries
    const itineraries = await Itinerary.find({
      user: req.user.userId,
      //   sorting the data from new to old date wise
    }).sort({ createdAt: -1 });

    res.status(200).json(itineraries);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Give me specific itineraries belonging to this user
const getSingleItinerary = async (req, res) => {
  try {
    const itinerary = await Itinerary.findById(req.params.id);

    if (!itinerary) {
      return res.status(404).json({
        message: "Itinerary Not Found",
      });
    }

    res.status(200).json(itinerary);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

//deleting the itineraries by id
const deleteItinerary = async (req, res) => {
  try {
    // first find Itinerary
    const itinerary = await Itinerary.findOne({
      _id: req.params.id,
      user: req.user.userId,
    });


    if (!itinerary) {
      return res.status(404).json({
        message: "Itinerary Not Found",
      });
    }

    // Delete the Itinerary
    await Itinerary.findByIdAndDelete(req.params.id);

    res.status(200).json({
      message: "Itinerary Deleted Successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

//sharing the itineraries by id
const shareItinerary = async (req, res) => {
  try {
    const itinerary = await Itinerary.findById(req.params.id);

    if (!itinerary) {
      return res.status(404).json({
        message: "Itinerary Not Found",
      });
    }

    res.status(200).json(itinerary);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  generateItinerary,
  getUserItineraries,
  getSingleItinerary,
  deleteItinerary,
  shareItinerary,
};
