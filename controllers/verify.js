const User = require("../models/user");

const verify = async (req, res) => {
  const { verificationToken } = req.params;
  try {
    const user = await User.verifyUser(verificationToken);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).send("Email verified successfully" );
  } catch (error) {
    console.log("Email verify error",error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { verify };
