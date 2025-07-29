// models/auth.model.js
const db = require("../config/db");
const bcrypt = require("bcryptjs");
const idGenerator = require("../utils/idGenerator");

class AuthModel {
  // 用户登录
  async login(username, password) {
    const [users] = await db.query("SELECT * FROM users WHERE username = ?", [
      username,
    ]);

    if (users.length === 0) {
      return null;
    }

    const user = users[0];
    const isPasswordValid = await bcrypt.compare(password, user.password);

    // 确保user_only_id存在
    if (!user.user_only_id) {
      throw new Error("用户缺少唯一标识");
    }

    return isPasswordValid ? user : null;
  }

  // 存储刷新令牌
  async storeRefreshToken(user_only_id, refreshToken) {
    await db.query(
      "UPDATE users SET refresh_token = ? WHERE user_only_id = ?",
      [refreshToken, user_only_id]
    );
  }

  // 验证刷新令牌
  async verifyRefreshToken(user_only_id, refreshToken) {
    const [users] = await db.query(
      "SELECT * FROM users WHERE user_only_id = ? AND refresh_token = ?",
      [user_only_id, refreshToken]
    );

    return users.length > 0;
  }

  // 清除刷新令牌
  async clearRefreshToken(user_only_id) {
    await db.query(
      "UPDATE users SET refresh_token = NULL WHERE user_only_id = ?",
      [user_only_id]
    );
  }
}

module.exports = new AuthModel();
