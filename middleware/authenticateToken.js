const jwt = require("jsonwebtoken");
const config = require('../config/config');

const authenticateToken = (req, res, next) => {
  const token = req.headers["authorization"];
  console.log(token);
  if (token == null) {
    return res.sendStatus(401);
  }

  jwt.verify(token, config.tokens.accessTokenSecret, (err, user) => {
    if (err) {
      return res.sendStatus(403);
    }
    req.user = user;
    next();
  });
};

module.exports = authenticateToken;


//router.post("/",authenticateToken,(req,res)=>{ console.log(req.user)})  example usage
//next() ??