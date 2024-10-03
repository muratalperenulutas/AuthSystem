const User = require("../models/user");

const resetPassword = async (req, res) => {
  const { passwordResetToken } = req.params;
  const { password } = req.body;
  console.log("Received token:", passwordResetToken);
  console.log("Received password:", password);

  try {
    const user = await User.findByPasswordResetToken(passwordResetToken);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    console.log(user.id);
    
    await User.updatePassword(user.id, password);

    return res.json({
      message: "Password has been reset successfully!",
      user: req.user, 
    });
  } catch (error) {
    console.error("Error :", error);
    return res.status(500).json({ message: "An error occurred." });
  }
};

module.exports = { resetPassword };
