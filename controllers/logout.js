const User = require("../models/user");

async function logout(req, res) {
  const userId = req.user.id;

  try {
    result = await User.removeRefreshTokens(userId);
    if (!result) {
      return res.status(404).json({ message: "No active session found." });
    }

    res.status(200).json({ message: "Logout successful." });
  } catch (error) {
    console.error("Error during logout:", error);
    res.status(500).json({ message: "Internal server error." });
  }
}

module.exports = { logout };
