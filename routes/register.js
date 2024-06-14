const express = require("express");
const router = express.Router();
const User = require("../models/user");
const sendVerificationEmail = require("../utils/sendVerificationEmail");

router.post("/", async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const existingUser1 = await User.findByEmail(email);
    const existingUser2 = await User.findByUsername(username);

    if (existingUser1) {
      return res.status(400).json({ message: "Email already in use!" });
    }

    if (existingUser2) {
      return res.status(400).json({ message: "Username already in use!" });
    }

    const newUser = await User.registerUser(username, email, password);
    sendVerificationEmail(email,newUser.verification_token);
    res
      .status(201)
      .json({ message: "User has been registered!", user: newUser });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
