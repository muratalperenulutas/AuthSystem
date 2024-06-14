module.exports = {
    service:'Gmail',
    auth: {
      user: 'email',
      pass: 'password',
    },
    emailSubject:'Email Verification',
    emailBodyText(token){
      return `Please verify your email by clicking on the following link: http://localhost:7000/verify/${token}`
    },
  };


