// models/user.model.js
const knex = require("../config/db"); // 同样，引入 Knex 实例
const bcrypt = require("bcryptjs");

class UserModel {
  // 获取用户信息
  async getUserById(user_only_id) {
    // 使用 Knex 查询并指定返回字段
    return knex("users")
      .select("id", "username", "email", "role")
      .where({ user_only_id: user_only_id })
      .first();
  }

  // 获取当前用户路由
  async getUserRoutes(role) {
    // 使用 Knex 查询
    return knex("role").select("routes").where({ role: role }).first();
  }

  // 创建用户
  async createUser(userData) {
    const { username, password, email, role = "user" } = userData;
    const hashedPassword = await bcrypt.hash(password, 10);

    // Knex 的 insert 方法
    const [insertId] = await knex("users").insert({
      username: username,
      password: hashedPassword,
      email: email,
      role: role,
    });

    return insertId;
  }

  // 更新用户信息
  async updateUser(userId, updateData) {
    // Knex 处理动态更新非常优雅
    const { email, role } = updateData;
    const updateObject = {};

    if (email) {
      updateObject.email = email;
    }

    if (role) {
      updateObject.role = role;
    }

    if (Object.keys(updateObject).length === 0) {
      throw new Error("没有提供更新字段");
    }

    const affectedRows = await knex("users")
      .where({ id: userId })
      .update(updateObject);

    return affectedRows > 0;
  }

  // 获取所有用户
  async getAllUsers() {
    // 使用 Knex 查询
    return knex("users").select(
      "id",
      "username",
      "email",
      "role",
      "created_at"
    );
  }
}

module.exports = new UserModel();
