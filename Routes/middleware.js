const jwt = require("jsonwebtoken");
const verifyToken = (req, res, next) => {
  let authHeader = req.headers["authorization"];
  if (authHeader) {
    console.log(process.env.JWTSEC);
    let token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.JWTSEC, (err, user) => {
      console.log(token);
      if (err) {
        res.status(404).json(err);
      } else {
        next();
      }
    });
  } else {
    res.status(404).json("Invalid Token");
  }
};
module.exports = { verifyToken };
