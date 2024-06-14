const express = require("express");
const router = express.Router();
const User = require("../models/user");

router.get("/:verificationToken", async (req, res) => {
  const { verificationToken } = req.params;
  try {
    const user = await User.verifyUser(verificationToken);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "Email verified successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
