const path = require("path");

const sendResetPasswordPage = (req, res) => {
  const { passwordResetToken } = req.params;
  console.log("token: ",passwordResetToken);
  res.sendFile(path.join(__dirname, '../views/reset-password.html'));
};

module.exports = { sendResetPasswordPage };
