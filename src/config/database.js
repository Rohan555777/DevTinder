const mongoose = require("mongoose");

async function connectDb() {
  await mongoose.connect("mongodb+srv://kharatrohan555_db_user:Rohan555@namsterohan.eu3rlck.mongodb.net/devTinder");
}

//Exports

module.exports = {
  connectDb,
};
