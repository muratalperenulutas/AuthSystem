const jwt = require("jsonwebtoken");
const config = require("../config/config");
const User = require("../models/user");

const authenticateAccessToken = (req, res, next) => {
  const accessToken = req.headers["authorization"];
  console.log(accessToken);
  if (accessToken == null) {
    return res.sendStatus(401);
  }

  jwt.verify(
    accessToken,
    config.tokens.accessTokenSecret,
    async (err, user) => {
      if (err) {
        return res.sendStatus(403);
      }
      req.user = user;
      refreshToken = req.user.refreshToken;

      try {
        const tokenData = await User.getRefreshToken(user.id, refreshToken);
        if (!tokenData || tokenData.refresh_token !== refreshToken) {
          return res.status(403).json({ message: "Token invalid!" });
        }

        next();
      } catch (error) {
        console.log("Auth access token error:", error);
        res.status(500).json({ message: "Internal server error" });
      }

      next();
    }
  );
};

module.exports = authenticateAccessToken;
