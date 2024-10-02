const jwt = require("jsonwebtoken");
const config = require("../config/config");

const authenticateAccessToken = (req, res, next) => {
  const accessToken = req.headers["authorization"];
  console.log(accessToken);
  if (accessToken == null) {
    return res.sendStatus(401);
  }

  jwt.verify(accessToken, config.tokens.accessTokenSecret, (err, user) => {
    if (err) {
      return res.sendStatus(403);
    }
    req.user = user;
    next();
  });
};

module.exports = authenticateAccessToken;
