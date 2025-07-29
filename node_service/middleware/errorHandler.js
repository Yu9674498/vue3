module.exports = (err, req, res, next) => {
  console.error(err.stack);

  // 特定错误处理
  if (err.name === "ValidationError") {
    return res.apiError("数据验证失败", 400, err.errors);
  }

  // 数据库错误处理
  if (err.code === "ER_DUP_ENTRY") {
    return res.apiError("数据已存在", 409);
  }

  // 通用错误处理
  res.apiError("服务器内部错误", 500);
};
