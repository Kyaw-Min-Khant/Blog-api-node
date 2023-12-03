const User = require("../modal/User");
const CryptoJS = require("crypto-js");
const { errorResponse, successResponse } = require("../reqAndRes");
require("dotenv").config();
const singup = async (req, res) => {
  const { adminName, email, password } = req.body;
  console.log(adminName, email, password);
  if (!adminName || !email || !password) {
    return errorResponse(
      400,
      {
        data: "false",
        message: "All Fields are required",
      },
      res
    );
  }
  const newUser = new User({
    adminName: adminName,
    email: email,
    password: CryptoJS.AES.encrypt(
      password,
      process.env.PASSWORD_SECRET
    ).toString(),
  });
  try {
    const signUpUser = await newUser.save();
    console.log(signUpUser);
    return successResponse(
      200,
      { data: "true", message: "Register Successful" },
      res
    );
  } catch (err) {
    return errorResponse(400, { data: "false", message: err }, res);
  }
};
module.exports = { singup };
