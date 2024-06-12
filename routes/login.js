const express = require("express");
const router = express.Router();
const User = require("../models/user");

router.post("/", async (req, res) => {
  const { email, password } = req.body;

  try{
    const user = await User.findByEmail(email);

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  if (password !== user.password) {
    return res.status(401).json({ message: "Password do not match!" });
  }

  res.status(200).json({ message: "Login successful" });
    
  }
  catch(error){
    console.log(error)
    res.status(500).json({ message: "Internal server error" });
  }
  
});

module.exports = router;
