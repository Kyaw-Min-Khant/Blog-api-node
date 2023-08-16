const mongoose = require("mongoose");
const WriterSchema = new mongoose.Schema(
  {
    adminName: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, unique: true },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Writer", WriterSchema);
