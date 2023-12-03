const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");
const auth = require("./Routes/auth");
const blogRouter = require("./Routes/blog");
const { connectDb } = require("./Config/db.config.js");

const path = require("path");
connectDb();
app.use(cors());
app.use(express.json());
app.use(
  express.urlencoded({ limit: "60mb", extended: true, parameterLimit: 1000000 })
);
app.use("/uploads", express.static("uploads"));
app.use("/auth", auth);
app.use("/blog", blogRouter);
app.listen(process.env.PORT, () => {
  console.log(`Server is listening on Port ${process.env.PORT}`);
});
