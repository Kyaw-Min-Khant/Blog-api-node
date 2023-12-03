const router = require("express").Router();
const writer = require("../modal/User");
const PAGE_SIZE = 10;

const CryptoJS = require("crypto-js");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const { singup } = require("../Controllers/AuthController");

//Register
router.post("/signup", singup);
//login
router.post("/login", async (req, res) => {
  console.log(req.body);
  try {
    let user = await writer.findOne({ adminName: req.body.adminName });
    let hashPassword = CryptoJS.AES.decrypt(
      user.password,
      process.env.PASSWORD_SECRET
    );
    let accessToken = jwt.sign(
      {
        id: user._id,
      },
      process.env.JWTSEC,
      { expiresIn: "15d" }
    );
    let rowPassword = hashPassword.toString(CryptoJS.enc.Utf8);
    rowPassword !== req.body.password && res.status(401).json("Login Failed");
    res.status(200).json({ Token: accessToken });
  } catch (e) {
    res.status(500).json("Login failed");
  }
});
module.exports = router;
