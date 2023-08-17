const mongoose = require("mongoose");
const validateEmail = (email) => {
  const re = /^\S+@\S+\.\S+$/;
  return re.test(email);
};

const WriterSchema = new mongoose.Schema(
  {
    adminName: { type: String, required: true, unique: true },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: [validateEmail, "Please fill a valid email address"],
    },
    password: { type: String, required: true, unique: true },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Writer", WriterSchema);
