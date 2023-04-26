const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    if (file.fieldname == "images") {
      cb(null, "images" + Date.now() + ".png");
    } else {
      cb(null, "images" + Date.now() + ".mp4");
    }
  },
});

const upload = multer({ storage });
module.exports = upload;
