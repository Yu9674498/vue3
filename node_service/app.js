// app.js
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const app = express();

// 中间件
app.use(
  cors({
    origin: process.env.CORS_ORIGIN || "http://localhost:3000",
    credentials: true,
  })
);
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// API响应格式化中间件
const apiResponse = require("./middleware/apiResponse");
app.use(apiResponse);

// 路由
app.use("/dev-api/auth", require("./routes/auth.route"));
app.use("/dev-api/user", require("./routes/user.route"));

// 404处理
app.use((req, res) => {
  res.apiError("端点未找到", 404);
});

// 错误处理中间件
const errorHandler = require("./middleware/errorHandler");
app.use(errorHandler);

module.exports = app;
