require("dotenv").config();
const mongoose = require("mongoose");

const url = process.env.SECRET_MONGO;
const connectDb = async () => {
  try {
    await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Mongoose connect");
  } catch (e) {
    console.log(e);
  }
};
module.exports = { connectDb };
