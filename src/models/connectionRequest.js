const mongoose = require("mongoose");
const { equals } = require("validator");

let connectionRequest = new mongoose.Schema(
  {
    fromUserId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    toUserId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);
connectionRequest.index({ fromUserId: 1, toUserId: 1 });

connectionRequest.pre("save", function (next) {
  let request = this;
  if (request.fromUserId.equals(request.toUserId)) {
    throw new Error("you cannot send connection request to yourself");
  }
  next();
});

module.exports = mongoose.model("connectionRequest", connectionRequest);
