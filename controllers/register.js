const User = require("../models/user");
const sendVerificationEmail = require("../utils/sendVerificationEmail");
const crypto = require("crypto");

const register = async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingUser1 = await User.findByEmail(email);

    if (existingUser1) {
      return res.status(400).json({ message: "Email already in use!" });
    }

    let username;
    let existingUser2;
    do {
      username = `user_${crypto.randomBytes(4).toString("hex")}`;
      existingUser2 = await User.findByUsername(username);
    } while (existingUser2);

    const newUser = await User.registerUser(username, email, password);
    sendVerificationEmail(email, newUser.verification_token);
    res
      .status(201)
      .json({ message: "User has been registered!" });
  } catch (error) {
    console.log("Register error:",error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { register };
