const jwt = require("jsonwebtoken");
const protect = (req, res, next) => {
  try {
    // taking token from frontent
    const authHeader = req.headers.authorization;

    // if token not provided
    if (!authHeader) {
      return res.status(401).json({
        message: "No Token Provided",
      });
    }

    // to get only token not Bearer <token>
    const token = authHeader.split(" ")[1];

    //verification
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded;

    next();
    // if error
  } catch (error) {
    res.status(401).json({
      message: "Invalid Token",
    });
  }
};

module.exports = protect;
