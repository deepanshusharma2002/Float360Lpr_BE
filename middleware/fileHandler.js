const multer = require("multer");

const storage = multer.diskStorage({
  destination: "./uploads/",
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});


const storageMulti = multer.memoryStorage();
// Initialize upload middleware and add file size limit
const upload = multer({
  storage: storage,
  limits: { fileSize: 1000000 }, // 1MB file size limit
}).single("myFile"); // 'myFile' is the name attribute of the file input field


const uploadMulti = multer({
  storage: storageMulti,
  limits: { fileSize: 1000000 }, // 1MB file size limit
}); // 'myFile' is the name attribute of the file input field

module.exports = { upload, uploadMulti };
