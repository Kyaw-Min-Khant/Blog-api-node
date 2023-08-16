const jwt = require("jsonwebtoken");
require("dotenv").config();
const verifyToken = (req, res, next) => {
  let authHeader = req.headers["authorization"];
  if (authHeader) {
    let token = authHeader.split("")[1];
    jwt.verify(token, process.env.JWTSEC, (err, user) => {
      if (err) {
        res.status(404).json("Error");
      } else {
        res.status(200).json(user);
      }
    });
  } else {
    res.status(404).json("Invalid Token");
  }
};
module.exports = { verifyToken };
