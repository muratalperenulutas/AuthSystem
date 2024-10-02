const express = require("express");
const bodyParser = require("body-parser");
const authRoutes = require("./routes/auth");
const db = require("./services/database");

db.connect()
  .then(() => {
    console.log("Connected to database!");
  })
  .catch((Error) => {
    console.log(Error);
  });

const app = express();

app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({ extended: true }));  //for x-www-form-urlencoded

app.use("/auth", authRoutes);

const PORT = 7000;
app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});
