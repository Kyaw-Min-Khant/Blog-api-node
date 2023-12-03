const Content = require("../modal/Content");
const router = require("express").Router();
require("dotenv").config();
const multer = require("multer");
const { verifyToken } = require("./middleware");
const { getStorage, ref, uploadBytesResumable } = require("firebase/storage");
let storage = multer.diskStorage({
  destination: function (req, file, cb) {
    console.log(file);
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    console.log(file);
    cb(null, Date.now() + "_" + file.originalname);
  },
});
let upload = multer({ storage: storage });
router.post("/", verifyToken, upload.single("img"), async (req, res) => {
  const dateTime = Date.now();
  const fileName = `images/${dateTime}`;
  const storageRef = ref(storageFB, fileName);
  const storageFB = getStorage();

  console.log(req);
  let newBlog = new Content({
    title: req.body.title,
    img: req.file.filename,
    categories: req.body.categories,
    content: req.body.content,
  });
  try {
    let createBlog = await newBlog.save();
    res.status(200).json("Create SuccessFul ! ");
  } catch (err) {
    res.status(404).json(err);
  }
});
router.put("/:id", verifyToken, async (req, res) => {
  let blogId = req.params.id;
  try {
    let content = await Content.findByIdAndUpdate(
      blogId,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json("Upload Success");
  } catch (err) {
    res.status(404).send(err);
  }
});
router.get("/", async (req, res) => {
  const PAGE_SIZE = 10;
  let blog;
  const page = parseInt(req.query.page) || 1;
  try {
    const skip = (page - 1) * PAGE_SIZE;
    blog = await Content.find({}, { title: 1, img: 1, categories: 1 })
      .sort({ createTime: 1 })
      .skip(skip)
      .limit(PAGE_SIZE);

    res.status(200).json(blog);
  } catch (err) {
    req.status(404).json(err);
  }
});
router.get("/:id", async (req, res) => {
  let blogId = req?.params?.id;
  try {
    let content = await Content.findById(blogId);
    res.status(200).json(content);
  } catch (err) {
    res.status(500).json(err);
  }
});
router.delete("/:id", verifyToken, async (req, res) => {
  console.log(req.params.id);
  let blogId = req?.params?.id;
  try {
    let content = await Content.findByIdAndDelete(blogId);
    res.status(200).json("Delete Successful");
  } catch (err) {
    res.status(err).json("Delete Failed");
  }
});

module.exports = router;
