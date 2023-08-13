const Content = require("../modal/Content");
const router = require("express").Router();
require("dotenv").config();
const multer = require("multer");
let storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "_" + file.originalname);
  },
});

let upload = multer({ storage: storage });

router.post("/createblog", upload.single("img"), async (req, res) => {
  let newBlog = new Content({
    title: req.body.title,
    img: req.file.filename,
    categories: req.body.categories,
    content: req.body.content,
    links: req.body.links,
  });
  try {
    let createBlog = await newBlog.save();
    res.status(200).json("Create SuccessFul!!");
  } catch (err) {
    res.status(500).json(err);
  }
});
router.get("/", async (req, res) => {
  let blog;
  try {
    blog = await Content.find({}, { title: 1, img: 1, categories: 1 }).sort({
      createTime: 1,
    });
    res.status(200).json(blog);
  } catch (err) {
    req.status(500).json(err);
  }
});
router.get("/:id", async (req, res) => {
  let blogId = req?.params?.id;
  try {
    let content = await Content.findById(blogId);
    console.log(content);
    res.status(200).json(content);
  } catch (err) {
    res.status(500).json(err);
  }
});
router.delete("/:id", async (req, res) => {
  let blogId = req?.params?.id;
  try {
    let content = await Content.findByIdAndDelete(blogId);
    res.status(200).json("Delete Successful");
  } catch (err) {
    res.status(err.status).json("Delete Failed");
  }
});

module.exports = router;
