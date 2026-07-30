const express = require("express");
const { userAuth } = require("../middleweres/auth");
const User = require("../models/user");
const ProfileRouter = express.Router();
const bcrypt = require("bcrypt");
const validator = require("validator");

ProfileRouter.get("/profile/view", userAuth, async (req, res) => {
  try {
    user = req.user;
    res.send(user);
  } catch (err) {
    res.status(400).send("err : " + err.message);
  }
});

ProfileRouter.patch("/profile/edit", userAuth, async (req, res) => {
  let preUser = req.user;
  let user = req.body;
  try {
    let Allowed_user = ["firstName", "lastName", "imgUrl", "age"];
    let access = Object.keys(user).every((key) => Allowed_user.includes(key));
    if (!access) {
      return res.status(401).send("invalid Input request !");
    }
    Object.keys(user).forEach((key) => (preUser[key] = user[key]));
    await preUser.save();
    res.send("Profile Updated Successfully !");
  } catch (err) {
    res.send(err.message);
  }
});

ProfileRouter.patch("/profile/pass", userAuth, async (req, res) => {
  try {
    let user = req.user;
    console.log(user);
    let { password, newPassword } = req.body;
    let access = await bcrypt.compare(password, user.password);
    if (!access) {
      throw new Error("invalid Credential!");
    }
    if (!validator.isStrongPassword(newPassword)) {
      throw new Error("use Strong Password");
    }
    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();
    console.log(user);
    res.send("password updated successfully !");
  } catch (err) {
    res.status(400).send(err.message);
  }
});

module.exports = ProfileRouter;
