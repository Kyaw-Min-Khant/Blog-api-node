const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const auth = require("./Routes/auth");
const blogRouter = require("./Routes/blog");
const corsOption = {
  origin: "http://localhost:5173",
  Credentials: true,
};
const url = process.env.SECRET_MONGO;
const path = require("path");
mongoose
  .connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((data) => console.log("DB Collection Success"))
  .catch((err) => console.log(err));
app.use("/uploads", express.static("/uploads"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors(corsOption));
app.use(bodyParser.json());
app.use("/auth", auth);
app.use("/blog", blogRouter);
app.listen(process.env.PORT, () => {
  console.log(`Server is listening on Port ${process.env.PORT}`);
});
