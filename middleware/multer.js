const multer = require('multer');
const path = require('path');


const storageSingle = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/allSingleFile");
  },
  filename: function (req, file, cb) {
    cb(null, `${file.originalname}-${Date.now()}${path.extname(file.originalname)}`);
  }
});

const uploadSingle = multer({ storage: storageSingle }).single("doc");


const storageVendor = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads/vendor');
  },
  filename: function (req, file, cb) {
    cb(null, `${file.fieldname}-${file.originalname}-${Date.now()}${path.extname(file.originalname)}`);
  }
});

const uploadVendor = multer({ storage: storageVendor }).single("doc");

module.exports = { uploadSingle, uploadVendor };