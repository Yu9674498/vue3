// middleware/auth.middleware.js
const { verifyToken, shouldRefreshToken } = require("../utils/jwt.util");
const jwt = require("jsonwebtoken");
const config = require("../config");
const createError = require("http-errors");

module.exports = {
  // 认证中间件
  authenticate: (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return next(createError.Unauthorized("未提供访问令牌"));
    }

    const token = authHeader.split(" ")[1];

    try {
      const decoded = verifyToken(token);
      req.user = decoded.userInfo;

      // 计算令牌剩余时间
      const now = Math.floor(Date.now() / 1000);
      const expiresIn = decoded.exp - now;

      // 在阈值内自动刷新令牌
      if (expiresIn < config.jwt.refreshThresholdSeconds) {
        const newAccessToken = generateAccessToken(decoded.userInfo);

        // 设置响应头
        res.setHeader("X-New-Access-Token", newAccessToken);

        // 同时设置Cookie（可选）
        res.cookie("access_token", newAccessToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "strict",
          maxAge: config.jwt.accessTokenExpiresSeconds * 1000,
        });

        // 记录刷新日志
        console.log(`[JWT] 令牌已刷新，剩余时间: ${expiresIn}秒`);
      }

      next();
    } catch (error) {
      // 处理特定错误
      if (error.name === "TokenExpiredError") {
        return next(createError.Unauthorized("访问令牌已过期"));
      }

      next(createError.Unauthorized("无效的访问令牌"));
    }
  },

  // 授权中间件（按角色）
  authorize: (roles = []) => {
    if (typeof roles === "string") {
      roles = [roles];
    }

    return (req, res, next) => {
      if (!req.user) {
        return next(createError.Unauthorized("用户未认证"));
      }

      if (roles.length && !roles.includes(req.user.role)) {
        return next(createError.Forbidden("无权访问此资源"));
      }

      next();
    };
  },
};
