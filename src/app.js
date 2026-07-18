const express = require("express");
const app = express();
const { connectDb } = require("./config/database.js");
const User = require("./models/user.js");

app.use(express.json());

app.post("/signUp", async (req, res) => {
  console.log(req.body);
  let user = new User(req.body);
  try {
    await user.save();
    res.send("User created successfully");
  } catch (err) {
    res.status(500).send("Error Ocuurred");
  }
});

// connection mongodb

connectDb()
  .then(() => {
    console.log("connection established ...");
    app.listen(1000, () => {
      console.log("rohan is watching... ");
    });
  })
  .catch(() => console.log("Error ocurred "));
