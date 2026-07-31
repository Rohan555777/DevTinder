const express = require("express");
let RequestRouter = express.Router();
let { userAuth } = require("../middleweres/auth.js");
const connectionRequest = require("../models/connectionRequest");
const User = require("../models/user.js");

RequestRouter.post("/request/send/:status/:userId", userAuth, async (req, res) => {
  try {
    const allowed_status = ["intrested", "ignored"];
    let toUserId = req.params.userId;
    let status = req.params.status;
    let fromUserId = req.user._id;
    //status handle
    if (!allowed_status.includes(status)) {
      throw new Error("invalid Status Type !");
    }
    //validating toUserId
    let toUserExist = await User.findById(toUserId);
    if (!toUserExist) {
      throw new Error("User not found ");
    }
    console.log(toUserExist);
    // id case handle
    let connectionExist = await connectionRequest.findOne({
    
      $or: [
        { fromUserId, toUserId },
        { fromUserId: toUserId, toUserId: fromUserId },
      ],
    });
    if (connectionExist) {
      throw new Error("Connection already Exist");
    }
    let connection = await new connectionRequest({ fromUserId, toUserId, status }).save();
  
    res.json({
      message: `${req.user.firstName} send ${status} to ${toUserExist.firstName} `,
    });
  } catch (err) {
    res.status(400).send("Error : " + err.message);
  }
});

module.exports = RequestRouter;
