const auth = (req, res) => {
  console.log("Received a GET request on /auth route");
  res.send("Server running");
};

module.exports = { auth };
