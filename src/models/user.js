const mongoose = require("mongoose");
const { Schema, model } = mongoose;
const bcrypt = require("bcrypt");
const JWT = require("jsonwebtoken");

const userSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 50,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 50,
    },
    emailId: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
    },

    age: {
      type: Number,
      min: 18,
    },

    gender: {
      type: String,
      enum: ["male", "female", "others"],
    },
    imgUrl: {
      type: String,
      default:
        "https://media.istockphoto.com/id/2151669184/vector/vector-flat-illustration-in-grayscale-avatar-user-profile-person-icon-gender-neutral.jpg?s=612x612&w=0&k=20&c=UEa7oHoOL30ynvmJzSCIPrwwopJdfqzBs0q69ezQoM8=",
    },
  },
  { timestamps: true },
);

// Token generater
userSchema.methods.getJWT = async function () {
  user = this;
  let token = await JWT.sign({ _id: user._id }, "Rohan@DEv$sign777", { expiresIn: "7d" });
  return token;
};
//
// password validator
userSchema.methods.passValid = async function (password) {
  user = this;
  return await bcrypt.compare(password, user.password);
};

const User = model("User", userSchema);

module.exports = User;
