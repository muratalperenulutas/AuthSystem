const User = require("../models/user");
const bcrypt = require("bcrypt");

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findByEmail(email);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    if (!user.is_verified) {
      return res.status(404).json({ message: "User not verified" });
    }
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({ message: "Password do not match!" });
    }

    const accessToken = await User.createAccessToken(user);
    const refreshToken = await User.handleRefreshToken(user);

    res
      .status(200)
      .json({
        message: "Login successful",
        accessToken: accessToken,
        refreshToken: refreshToken,
      });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { login };
