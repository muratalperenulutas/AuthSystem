const nodemailer = require("nodemailer");
const config = require("../config/config");

const sendVerificationEmail = (email, token) => {
  const transporter = nodemailer.createTransport({
    service: config.email.service,
    auth: config.email.auth,
  });

  const mailOptions = {
    from: config.email.auth.user,
    to: email,
    subject: config.email.emailSubject,
    text: config.email.emailBodyText(token),
  };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log("Error sending email:", error);
    } else {
      console.log("Email sent:", info.response);
    }
  });
};

module.exports = sendVerificationEmail;
