const dotenv = require('dotenv');
dotenv.config(); 

module.exports = {
  database: {
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT || 5432,
  },
  email: {
    service: process.env.EMAIL_SERVICE,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,  
    },
    emailSubject: 'Email Verification',
    emailBodyText(token) {
      return `Please verify your email by clicking on the following link: ${process.env.BASE_URL}/verify/${token}`;
    },
  },
  tokens: {
    accessTokenSecret: process.env.ACCESS_TOKEN_SECRET,
    refreshTokenSecret: process.env.REFRESH_TOKEN_SECRET,
  },
};
