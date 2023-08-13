const router = require("express").Router();
const writer = require("../modal/User");

const CryptoJS = require("crypto-js");
require("dotenv").config();
const jwt = require("jsonwebtoken");

//Register
router.post("/signup", async (req, res) => {
  let newUser = new writer({
    adminName: req.body.adminName,
    email: req.body.email,
    password: CryptoJS.AES.encrypt(
      req.body.password,
      process.env.PASSWORD_SECRET
    ).toString(),
  });
  try {
    const signUpUser = await newUser.save();
    res.status(201).json("Register Successful");
  } catch (err) {
    res.status(500).json(err);
  }
});
//login
router.post("/login", async (req, res) => {
  try {
    let user = await writer.findOne({ adminName: req.body.adminName });
    let hashPassword = CryptoJS.AES.decrypt(
      user.password,
      process.env.PASSWORD_SECRET
    );
    let accessToken = jwt.sign(
      {
        id: user._id,
        isAdmin: user.isAdmin,
      },
      process.env.JWTSEC,
      { expiresIn: "7d" }
    );
    console.log(hashPassword);
    console.log(accessToken);
    let rowPassword = hashPassword.toString(CryptoJS.enc.Utf8);
    rowPassword !== req.body.password && res.status(401).json("Login Failed");
    res.status(200).json({ Token: accessToken });
  } catch (e) {
    res.status(500).json(e);
  }
});
module.exports = router;
