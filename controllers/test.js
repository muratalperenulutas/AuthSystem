const test = (req, res) => {
  res.json({ message: "This is a test!", user: req.user });
};

module.exports = { test };
