const express = require("express");
const app = express();
const { connectDb } = require("./config/database.js");
const User = require("./models/user.js");

app.post("/signUp", async (req, res) => {
  let user = new User({
    firstName: "rohan",
    lastName: "kharat",
    emailId: "kharatrohan555@gamil.com",
    password: 1234,
  });
  try {
    await user.save();
    res.send("User Added Successfully !");
  } catch (err) {
    res.status(500).send("error");
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
