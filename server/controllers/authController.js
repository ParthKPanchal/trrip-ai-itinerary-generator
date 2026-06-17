const User = require("../models/User");
const bcrypt = require("bcryptjs");

const registerUser = async (req, res) => {
  try {
    // taking input from user when register
    const { name, email, password } = req.body;
    const existingUser = await User.findOne({ email });

    // already a user
    if (existingUser) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    // encrypted text
    const hashedPassword = await bcrypt.hash(password, 10);

    // Creating new user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    res.status(201).json({
      message: "User Registered Successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });

    // throwing error
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  registerUser,
};
