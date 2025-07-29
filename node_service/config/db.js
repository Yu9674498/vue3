// config/db.js
const { db } = require("."); // 从config/index加载配置
const mysql = require("mysql2/promise");

const pool = mysql.createPool(db);

// // 连接池事件监听
// pool.on("connection", (connection) => {
//   console.log("📡 新数据库连接建立:", connection.threadId);
// });

// pool.on("acquire", (connection) => {
//   console.debug("🔗 连接被获取:", connection.threadId);
// });

// pool.on("release", (connection) => {
//   console.debug("🔄 连接已释放:", connection.threadId);
// });

// pool.on("error", (err) => {
//   console.error("‼️ 数据库连接错误:", err.message);
//   // 这里可以添加警报通知逻辑
// });

module.exports = pool; // 使用统一配置
