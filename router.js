const express = require("express");
const router = express.Router();

const loginRoutes = require("./routes/login");
const registerRoutes = require("./routes/register");
const testRoutes = require("./routes/test");

router.use("/login", loginRoutes);
router.use("/register", registerRoutes);
router.use("/test", testRoutes);

module.exports = router;
