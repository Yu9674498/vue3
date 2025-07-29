// utils/jwt.util.js
const jwt = require("jsonwebtoken");
const config = require("../config");
const createError = require("http-errors");

// 生成访问令牌（直接使用userInfo作为payload）
exports.generateAccessToken = (userInfo) => {
  return jwt.sign({ userInfo }, config.jwt.secret, {
    expiresIn: config.jwt.accessTokenExpiresIn,
  });
};

// 生成刷新令牌（直接使用userInfo作为payload）
exports.generateRefreshToken = (userInfo) => {
  return jwt.sign(
    {
      userInfo,
      isRefreshToken: true,
    },
    config.jwt.secret,
    {
      expiresIn: config.jwt.refreshTokenExpiresIn,
    }
  );
};

// 验证令牌
exports.verifyToken = (token) => {
  try {
    return jwt.verify(token, config.jwt.secret);
  } catch (error) {
    // 规范化错误类型
    if (error.name === "TokenExpiredError") {
      throw createError.Unauthorized("令牌已过期");
    }
    throw createError.Unauthorized("无效的令牌");
  }
};

// 检查是否需要刷新令牌
exports.shouldRefreshToken = (decodedToken) => {
  const now = Math.floor(Date.now() / 1000);
  const expiresIn = decodedToken.exp - now;

  // 将阈值转换为秒
  const threshold = config.jwt.refreshThreshold;
  const thresholdValue = parseInt(threshold);
  const thresholdUnit = threshold.replace(thresholdValue, "");

  let thresholdSeconds;
  switch (thresholdUnit) {
    case "d":
      thresholdSeconds = thresholdValue * 86400;
      break;
    case "h":
      thresholdSeconds = thresholdValue * 3600;
      break;
    case "m":
      thresholdSeconds = thresholdValue * 60;
      break;
    default:
      thresholdSeconds = thresholdValue;
  }

  return expiresIn < thresholdSeconds;
};

// 验证刷新令牌
exports.verifyRefreshToken = (token) => {
  const decoded = this.verifyToken(token);
  if (!decoded.isRefreshToken) {
    throw createError.Unauthorized("无效的刷新令牌类型");
  }
  return decoded;
};
