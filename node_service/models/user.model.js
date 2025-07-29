// models/user.model.js
const db = require("../config/db");
const bcrypt = require("bcryptjs");

class UserModel {
  // 获取用户信息
  async getUserById(user_only_id) {
    const [users] = await db.query(
      "SELECT id, username, email, role FROM users WHERE user_only_id = ?",
      [user_only_id]
    );

    return users[0];
  }

  // 获取当前用户路由
  async getUserRoutes(role) {
    const [users] = await db.query("SELECT routes FROM role WHERE role = ?", [
      role,
    ]);

    return users[0];
  }

  // 创建用户
  async createUser(userData) {
    const { username, password, email, role = "user" } = userData;
    const hashedPassword = await bcrypt.hash(password, 10);

    const [result] = await db.query(
      "INSERT INTO users (username, password, email, role) VALUES (?, ?, ?, ?)",
      [username, hashedPassword, email, role]
    );

    return result.insertId;
  }

  // 更新用户信息
  async updateUser(userId, updateData) {
    const { email, role } = updateData;
    const updates = [];
    const values = [];

    if (email) {
      updates.push("email = ?");
      values.push(email);
    }

    if (role) {
      updates.push("role = ?");
      values.push(role);
    }

    if (updates.length === 0) {
      throw new Error("没有提供更新字段");
    }

    values.push(userId);

    const [result] = await db.query(
      `UPDATE users SET ${updates.join(", ")} WHERE id = ?`,
      values
    );

    return result.affectedRows > 0;
  }

  // 获取所有用户
  async getAllUsers() {
    const [users] = await db.query(
      "SELECT id, username, email, role, created_at FROM users"
    );
    return users;
  }
}

module.exports = new UserModel();
