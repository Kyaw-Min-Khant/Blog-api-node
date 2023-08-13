const mongoose = require("mongoose");
const BlogSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, unique: true },
    img: { type: String, required: true },
    categories: { type: Array },
    content: { type: String, required: true },
    links: { type: Array },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Blog", BlogSchema);
