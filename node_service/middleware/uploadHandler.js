const multer = require("multer");
const path = require("path");
const mime = require("mime");

module.exports = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, path.join(__dirname, "../uploads"));
    },
    filename: (req, file, cb) => {
      const ext = mime.extension(file.mimetype);
      cb(null, `${Date.now()}.${ext}`);
    },
  }),
  limits: {
    fileSize: 5 * 1024 * 1024, // 限制5MB
  },
});
