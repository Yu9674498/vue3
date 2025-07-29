// controllers/auth.controller.js
const AuthModel = require("../models/auth.model");
const {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
} = require("../utils/jwt.util");

class AuthController {
  // 用户登录
  async login(req, res) {
    try {
      const { username, password } = req.body;
      const user = await AuthModel.login(username, password);
      if (!user) {
        return res.apiError("用户名或密码错误", 401);
      }

      // JWT Payload包含用户关键信息
      const userInfo = {
        user_only_id: user.user_only_id,
        username: user.username,
        role: user.role,
        loginTime: new Date(),
      };

      const accessToken = generateAccessToken(userInfo);
      const refreshToken = generateRefreshToken(userInfo);

      // 存储刷新令牌到数据库
      await AuthModel.storeRefreshToken(user.user_only_id, refreshToken);

      res.apiSuccess(
        {
          token: accessToken,
        },
        "登录成功"
      );
    } catch (error) {
      res.apiError("登录失败: " + error.message, 500);
    }
  }

  // 刷新令牌
  async refreshToken(req, res) {
    try {
      const { refreshToken } = req.body;

      if (!refreshToken) {
        return res.apiError("缺少刷新令牌", 400);
      }

      const decoded = verifyRefreshToken(refreshToken);
      const isValid = await AuthModel.verifyRefreshToken(
        decoded.userInfo.user_only_id, // 使用user_only_id替代userId
        refreshToken
      );

      if (!isValid) {
        return res.apiError("无效的刷新令牌", 401);
      }

      // 使用解码后的用户信息生成新令牌
      const newAccessToken = generateAccessToken(decoded.userInfo);

      res.apiSuccess(
        {
          accessToken: newAccessToken,
        },
        "令牌刷新成功"
      );
    } catch (error) {
      // 统一过期状态码为401
      if (error.name === "TokenExpiredError") {
        return res.apiError("刷新令牌已过期", 401);
      }
      res.apiError("刷新令牌失败: " + error.message, 401);
    }
  }

  // 用户登出
  async logout(req, res) {
    try {
      const { user_only_id } = req.user; // 从JWT获取用户ID
      await AuthModel.clearRefreshToken(user_only_id);
      res.apiSuccess(null, "登出成功");
    } catch (error) {
      res.apiError("登出失败: " + error.message, 500);
    }
  }
}

module.exports = new AuthController();
