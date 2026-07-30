const express = require("express");
const { validation } = require("../utils/validation");
let AuthRouter = express.Router();
let bcrypt = require("bcrypt");
const User = require("../models/user");

AuthRouter.post("/signUp", async (req, res) => {
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

AuthRouter.post("/login", async (req, res) => {
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


module.exports = AuthRouter;
