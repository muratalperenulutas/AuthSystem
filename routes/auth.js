const express = require("express");
const router = express.Router();
const authenticateAccessToken = require("../middleware/authenticateAccessToken");
const authenticateRefreshToken = require("../middleware/authenticateRefreshToken");
const { login } = require("../controllers/login");
const { register } = require("../controllers/register");
const { verify } = require("../controllers/verify");
const { test } = require("../controllers/test");
const { refresh } = require("../controllers/refresh");
const { logout } = require("../controllers/logout");
const { forgotPassword } = require("../controllers/forgotPassword");
const { resetPassword } = require("../controllers/resetPassword");
const { sendResetPasswordPage } = require("../controllers/sendResetPasswordPage");

router.post("/register", register);

router.post("/login", login);

router.get("/verify/:verificationToken", verify);

router.post("/refresh", authenticateRefreshToken, refresh);

router.post("/logout", authenticateAccessToken, logout);

router.get("/test", authenticateAccessToken, test);

router.post("/forgot-password",forgotPassword);

router.get("/reset-password/:passwordResetToken",sendResetPasswordPage);

router.post("/reset-password/:passwordResetToken",resetPassword);

module.exports = router;
