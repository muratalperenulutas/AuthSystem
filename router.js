const express = require("express");
const router = express.Router();

const loginRoutes = require("./routes/login");
const registerRoutes = require("./routes/register");

router.use("/login", loginRoutes);
router.use("/register", registerRoutes);

module.exports = router;
