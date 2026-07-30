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
const AuthRouter = require("./Router/Auth.js");
const ProfileRouter = require("./Router/Profile.js");

app.use(express.json());
app.use(cookieParser());

app.use(AuthRouter);
app.use(ProfileRouter);

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
