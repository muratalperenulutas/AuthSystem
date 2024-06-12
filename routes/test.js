const express = require('express');
const authenticateToken = require('../middleware/authenticateToken');
const router = express.Router();

router.post("/", authenticateToken, (req, res) => {
  res.json({ message: "This is a test!", user: req.user });
});

module.exports = router;
