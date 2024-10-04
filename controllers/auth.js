const auth = (serverStartTime) => (req, res) => {
  console.log("Received a GET request on /auth route");
  const currentTime = new Date();
  const uptime = currentTime - serverStartTime; 
  const seconds = Math.floor((uptime / 1000) % 60);
  const minutes = Math.floor((uptime / (1000 * 60)) % 60);
  const hours = Math.floor((uptime / (1000 * 60 * 60)) % 24);
  const days = Math.floor(uptime / (1000 * 60 * 60 * 24));
  res.send(`Server running for ${days} days, ${hours} hours, ${minutes} minutes, and ${seconds} seconds.`);
};

module.exports = { auth };
