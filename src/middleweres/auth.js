const JWT = require("jsonwebtoken");
const User = require("../models/user");

let userAuth = async (req, res, next) => {
  try {
    const cookies = req.cookies;
    let { token } = cookies;
    if (!token) {
      throw new Error("Token is invalid !!!!");
    }
    let decodeMsg = JWT.verify(token, "Rohan@DEv$sign777");
    let { _id } = decodeMsg;
    let user = await User.findById(_id);
    if (!user) {
      throw new Error("User not found!");
    }
    req.user = user;
    next();
  } catch (err) {
    res.status(400).send("Err : " + err.message);
  }
};

module.exports = {
  userAuth,
};
