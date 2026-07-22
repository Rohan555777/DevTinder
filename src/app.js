const express = require("express");
const app = express();
const { connectDb } = require("./config/database.js");
const User = require("./models/user.js");
const { default: mongoose } = require("mongoose");
const { validation } = require("./utils/validation.js");
const bcrypt = require("bcrypt");

app.use(express.json());

app.post("/signUp", async (req, res) => {
  try {
    const { password, emailId, firstName, lastName } = req.body;

    //validation
    validation(req.body);
    //password encrypt
    passwordHash = await bcrypt.hash(password, 10);

    //new user
    let user = new User({
      firstName: firstName,
      lastName: lastName,
      emailId: emailId,
      password: passwordHash,
    });
    await user.save();
    res.send("User created successfully");
  } catch (err) {
    res.status(500).send("Error Ocuurred :" + err.message);
  }
});

//Post Login API
app.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;
    let user = await User.findOne({ emailId: emailId });
    if (!user) {
      return res.status(401).send("invalid credential!");
    }

    let validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).send("invalid credential");
    } else {
      res.send("Login Successfully!");
    }
  } catch (err) {
    res.status(400).send(err.message);
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
    let ALLOWED_KEYS = ["firstName", "lastName", "gender", "age"];
    let isValid = Object.keys(req.body).every((ch) => ALLOWED_KEYS.includes(ch));
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
