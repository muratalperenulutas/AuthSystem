const User = require("../models/user");
const sendPasswordResetEmail = require("../utils/sendPasswordResetEmail");

async function forgotPassword(req, res) {
  const {email} = req.body;

  try {
    const user = await User.findByEmail(email);
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    console.log(user);

    passwordResetToken=await User.createResetPasswordTokenAndSave(user);
    sendPasswordResetEmail(email,passwordResetToken);
    console.log(passwordResetToken);

    res.status(200).json({ message: "Email sent!" });
  } catch (error) {
    console.error("Forgot password error:", error);
    res.status(500).json({ message: "Internal server error." });
  }
}
 
module.exports = { forgotPassword };
