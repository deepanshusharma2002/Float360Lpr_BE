const express = require("express");
const router = express.Router();
const grnController = require("../../controllers/GrnLprController/GrnController");
const { uploadMulti } = require("../../middleware/fileHandler");


router.post("/", uploadMulti.any(), grnController.createGRN);

module.exports = router;