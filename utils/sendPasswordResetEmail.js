const nodemailer = require("nodemailer");
const config = require("../config/config");

const sendPasswordResetEmail = (email, resetPasswordToken) => {
  const transporter = nodemailer.createTransport({
    service: config.email.service,
    auth: config.email.auth,
  });

  const mailOptions = {
    from: config.email.auth.user,
    to: email,
    subject: config.email.passwordResetEmailSubject,
    text: config.email.passwordResetEmailBodyText(resetPasswordToken),
  };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log("Error sending email:", error);
    } else {
      console.log("Email sent:", info.response);
    }
  });
};

module.exports = sendPasswordResetEmail;
