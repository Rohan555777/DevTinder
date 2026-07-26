const express = require("express");
const app = express();
const { connectDb } = require("./config/database.js");
const User = require("./models/user.js");
const { default: mongoose } = require("mongoose");
const { validation } = require("./utils/validation.js");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const JWT = require("jsonwebtoken");
const { userAuth } = require("./middleweres/auth.js");

app.use(express.json());
app.use(cookieParser());

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
    //password and user validation
    const { emailId, password } = req.body;
    let user = await User.findOne({ emailId: emailId });
    if (!user) {
      return res.status(401).send("invalid credential!");
    }

    let validPassword = await user.passValid(password);
    if (validPassword) {
      //create Token
      let token = await user.getJWT();
      // add the tokan to cookie and send the respond back to the User
      res.cookie("token", token);
      res.send("Login Successfully!");
    } else {
      return res.status(401).send("invalid credential");
    }
  } catch (err) {
    res.status(400).send(err.message);
  }
});
//Profile
app.get("/profile", userAuth, async (req, res) => {
  try {
    user = req.user;
    res.send(user);
  } catch (err) {
    res.status(400).send("err : " + err.message);
  }
});

//Send connection request
app.post("/sendReq", userAuth, (req, res) => {
  try {
    let user = req.user;
    res.send(user.firstName + " sent a connection request");
  } catch (err) {
    res.status(501).send("Err : " + err.message);
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
