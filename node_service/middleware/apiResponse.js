module.exports = (req, res, next) => {
  res.apiSuccess = (data, message = "操作成功") => {
    res.json({
      code: 200,
      message,
      data,
    });
  };

  res.apiError = (message = "操作失败", code = 400, errors = []) => {
    res.status(code).json({
      code,
      message,
      errors,
    });
  };

  next();
};
