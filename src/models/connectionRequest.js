const mongoose = require("mongoose");

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
  { timeseries: true },
);

module.exports = mongoose.model("connectionRequest", connectionRequest);
