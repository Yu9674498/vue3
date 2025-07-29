// config/index.js
require("dotenv").config();

module.exports = {
  // 数据库配置
  db: {
    host: process.env.DB_HOST || "localhost",
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "hejinhua123",
    database: process.env.DB_NAME || "travel",
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
  },

  // JWT认证配置
  jwt: {
    secret: process.env.JWT_SECRET || "your_jwt_secret",

    // 令牌有效期（秒）
    accessTokenExpiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN || "1h", // 1小时
    refreshTokenExpiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN || "7d", // 7天

    // 刷新阈值（秒）
    refreshThreshold: process.env.REFRESH_TOKEN_REFRESH_THRESHOLD || "5m", // 5分钟

    // 计算秒数（新增）
    get accessTokenExpiresSeconds() {
      return this.parseTime(this.accessTokenExpiresIn);
    },
    get refreshTokenExpiresSeconds() {
      return this.parseTime(this.refreshTokenExpiresIn);
    },
    get refreshThresholdSeconds() {
      return this.parseTime(this.refreshThreshold);
    },

    // 时间解析方法
    parseTime(timeStr) {
      const value = parseInt(timeStr);
      if (timeStr.endsWith("d")) return value * 24 * 60 * 60;
      if (timeStr.endsWith("h")) return value * 60 * 60;
      if (timeStr.endsWith("m")) return value * 60;
      if (timeStr.endsWith("s")) return value;
      return parseInt(timeStr) || 300; // 默认5分钟
    },
  },

  // 服务器配置
  server: {
    port: process.env.PORT || 3000,
  },
};
