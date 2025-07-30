// controllers/user.controller.js
const UserModel = require("../models/user.model");

class UserController {
  // 获取当前用户信息（从JWT获取）
  async getCurrentUser(req, res) {
    try {
      // 直接从JWT验证后的req.user获取用户信息
      const { user_only_id } = req.user;
      const user = await UserModel.getUserById(user_only_id);

      if (!user) {
        return res.apiError("用户不存在", 404);
      }

      res.apiSuccess({ ...user, role: [user.role] }, "获取成功");
    } catch (error) {
      res.apiError("获取用户信息失败: " + error.message, 500);
    }
  }

  // 获取当前用户路由（从JWT获取）
  async getCurrentUserRoutes(req, res) {
    try {
      // 直接从JWT验证后的req.user获取角色
      const { role } = req.user;
      const routes = await UserModel.getUserRoutes(role);

      if (!routes) {
        return res.apiError("获取用户路由信息失败", 400);
      }

      res.apiSuccess(routes, "获取成功");
    } catch (error) {
      res.apiError("获取用户路由信息失败: " + error.message, 500);
    }
  }

  // 其他方法保持不变...
}

module.exports = new UserController();
