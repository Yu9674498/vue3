// routes/user.route.js
const express = require("express");
const router = express.Router();
const UserController = require("../controllers/user.controller");
const AuthMiddleware = require("../middleware/auth.middleware");

// 应用认证和授权中间件
router.use(AuthMiddleware.authenticate);
// router.use(AuthMiddleware.authorize("admin")); // 仅管理员可访问

router.get("/getUserInfo", UserController.getCurrentUser);
router.get("/getUserRoutes", UserController.getCurrentUserRoutes);

module.exports = router;
