const fs = require("fs");
const pdfParse = require("pdf-parse");

const Itinerary = require("../models/Itinerary");

const { GoogleGenerativeAI } = require("@google/generative-ai");

// Generate Itinerary
const generateItinerary = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        message: "Please upload a PDF file",
      });
    }

    // Read Uploaded PDF
    const filePath = req.file.path;

    const dataBuffer = fs.readFileSync(filePath);

    // Extract PDF Text
    const pdfData = await pdfParse(dataBuffer);

    console.log("✅ PDF Extracted Successfully");
    console.log("--------------------------------");
    console.log(pdfData.text);
    console.log("--------------------------------");

    console.log("🚀 Sending Data To Gemini...");

    // Gemini Setup
    const genAI = new GoogleGenerativeAI(
      process.env.GEMINI_API_KEY
    );

    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
    });

    const prompt = `
You are an expert travel planner.

Using the following travel booking details,
create a professional day-wise travel itinerary.

Include:
- Travel Summary
- Day Wise Plan
- Hotel Information (if available)
- Activities (if available)
- Important Travel Notes

Travel Details:

${pdfData.text}
`;

    let itinerary = "";

    try {
      const result = await model.generateContent(prompt);

      itinerary = result.response.text();

      console.log("✅ Gemini Response Received");
    } catch (error) {
      console.log("❌ Gemini Error:");
      console.log(error);

      return res.status(500).json({
        message: "Failed to generate itinerary using AI",
      });
    }

    // Save To MongoDB
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

// Get All User Itineraries
const getUserItineraries = async (req, res) => {
  try {
    const itineraries = await Itinerary.find({
      user: req.user.userId,
    }).sort({ createdAt: -1 });

    res.status(200).json(itineraries);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Get Single Itinerary
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

// Delete Itinerary
const deleteItinerary = async (req, res) => {
  try {
    const itinerary = await Itinerary.findOne({
      _id: req.params.id,
      user: req.user.userId,
    });

    if (!itinerary) {
      return res.status(404).json({
        message: "Itinerary Not Found",
      });
    }

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

// Share Itinerary
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