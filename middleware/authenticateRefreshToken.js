const jwt = require("jsonwebtoken");
const config = require("../config/config");
const User = require("../models/user");

const authenticateRefreshToken = (req, res, next) => {
  const refreshToken = req.headers["authorization"];

  if (!refreshToken) {
    return res.sendStatus(401);
  }

  jwt.verify(
    refreshToken,
    config.tokens.refreshTokenSecret,
    async (err, user) => {
      if (err) {
        return res.sendStatus(403);
      }
      req.user = user;
      try {
        const tokenData = await User.getRefreshToken(user.id, refreshToken);
        if (!tokenData || tokenData.refresh_token !== refreshToken) {
          return res.sendStatus(403);
        }

        req.refreshTokenData = tokenData;

        next();
      } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
      }
    }
  );
};

module.exports = authenticateRefreshToken;
