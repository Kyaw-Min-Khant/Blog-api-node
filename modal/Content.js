const mongoose = require("mongoose");
const BlogSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, unique: true },
    img: { type: String, required: true },
    categories: [{ type: String }],
    content: { type: String, required: true },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Blog", BlogSchema);
