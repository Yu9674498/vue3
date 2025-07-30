// config/db.js
const { db } = require("."); // 从config/index加载配置
const knex = require("knex")({
  client: "mysql2", // 建议使用 'mysql2' 驱动
  connection: {
    ...db, // 直接复用您在 index.js 中已有的配置
  },
  pool: {
    min: 2,
    max: 10,
  },
});

module.exports = knex; // 导出 Knex 实例
