// routes/auth.route.js
const express = require("express");
const router = express.Router();
const AuthController = require("../controllers/auth.controller");
const AuthMiddleware = require("../middleware/auth.middleware");

// 公共路由
router.post("/login", AuthController.login);
router.post("/refresh-token", AuthController.refreshToken);

// 需要认证的路由
router.use(AuthMiddleware.authenticate); // 应用认证中间件

router.post("/logout", AuthController.logout);

module.exports = router;
