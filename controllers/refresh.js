const User = require("../models/user");

const refresh = async (req, res) => {
  accessToken = await User.createAccessToken(req.user);
  res.status(200).json({ accessToken: accessToken });
};

module.exports = { refresh };
