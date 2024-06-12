const express = require("express");
const router = express.Router();
const User = require("../models/user");

router.post("/", async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingUser = await User.findByEmail(email);

    if (existingUser) {
      return res.status(400).json({ message: "User already exist!" });
    }
  
    const newUser = await User.registerUser(email, password);
    res.status(201).json({ message: "User has been registered!", user: newUser });
    
  } catch (error) {
    res.status(500).json({ message: "Internal server error", user: newUser });
    
  }

 
});

module.exports = router;
