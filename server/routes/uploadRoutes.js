const express = require("express");

const upload = require("../middleware/uploadMiddleware");

const router = express.Router();

router.post("/", upload.single("document"), (req, res) => {
  res.status(200).json({
    message: "File uploaded Successfully",
    file: req.file,
  });
});

module.exports= router;