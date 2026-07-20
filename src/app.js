const express = require("express");
const app = express();
const { connectDb } = require("./config/database.js");
const User = require("./models/user.js");
const { default: mongoose } = require("mongoose");

app.use(express.json());

app.post("/signUp", async (req, res) => {
  let user = new User(req.body);
  try {
    await user.save();
    res.send("User created successfully");
  } catch (err) {
    res.status(500).send("Error Ocuurred :" + err.message);
  }
});

//Get user by Email

app.get("/find", async (req, res) => {
  try {
    let game = await User.find({ emailId: req.body.emailId });
    res.send(game);
  } catch (err) {
    res.status(400).send("something went wrong");
  }
});

// Feed Api - Get/feed - get all the user from dataabase
app.get("/feed", async (req, res) => {
  try {
    let game = await User.find({});
    res.send(game);
  } catch (err) {
    res.status(400).send("something went wrong");
  }
});

//DELETE API

app.delete("/user", async (req, res) => {
  try {
    userId = req.body.userId;
    await User.findByIdAndDelete(userId);
    res.send("user Deleted successfully !");
  } catch (err) {
    res.status(400).send("something went wrong");
  }
});

// Update API

app.patch("/user", async (req, res) => {
  try {
    //validating
    let validKey = ["firstName", "lastName", "gender", "age"];
    let isValid = Object.keys(req.body).every((ch) => validKey.includes(ch));
    if (!isValid) {
      throw new Error("use Valid keys");
    }
    //handle update
    let quary = { firstName: req.body.firstName };
    let data = req.body;
    let check = await User.findOneAndUpdate(quary, data, { returnDocument: "before", runValidators: true });
    res.send("User updated successfully !");
  } catch (err) {
    res.status(400).send("something went wrong " + err.message);
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
  .catch((err) => console.log("Error ocurred " + err.message));
