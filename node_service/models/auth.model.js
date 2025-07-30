// models/auth.model.js
const knex = require("../config/db"); // 之前是 'db'，现在是 'knex'
const bcrypt = require("bcryptjs");
const idGenerator = require("../utils/idGenerator");

class AuthModel {
  // 用户登录
  async login(username, password) {
    // 使用 Knex 查询
    const user = await knex("users").where({ username: username }).first();

    if (!user) {
      return null;
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    // 确保user_only_id存在
    if (!user.user_only_id) {
      throw new Error("用户缺少唯一标识");
    }

    return isPasswordValid ? user : null;
  }

  // 存储刷新令牌
  async storeRefreshToken(user_only_id, refreshToken) {
    // 使用 Knex 更新
    await knex("users")
      .where({ user_only_id: user_only_id })
      .update({ refresh_token: refreshToken });
  }

  // 验证刷新令牌
  async verifyRefreshToken(user_only_id, refreshToken) {
    // 使用 Knex 查询
    const user = await knex("users")
      .where({
        user_only_id: user_only_id,
        refresh_token: refreshToken,
      })
      .first(); // .first() 返回单个对象或 undefined，更简洁

    return !!user; // 将 user 对象转换为布尔值
  }

  // 清除刷新令牌
  async clearRefreshToken(user_only_id) {
    // 使用 Knex 更新
    await knex("users")
      .where({ user_only_id: user_only_id })
      .update({ refresh_token: null });
  }
}

module.exports = new AuthModel();
