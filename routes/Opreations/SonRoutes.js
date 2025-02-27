const express = require("express");
const router = express.Router();
const OperationsSonController = require("../../controllers/Opreations/SonController");
const setAuditFields = require("../../middleware/setAuditFields.js");
const { uploadMulti } = require("../../middleware/fileHandler.js");

// API routes
router
  .get("/", OperationsSonController.getOperationsSons)
  .post(
    "/",
    setAuditFields,
    uploadMulti.any(),
    OperationsSonController.createOperationsSon
  )
  .post(
    "/lapse",
    setAuditFields,
    uploadMulti.any(),
    OperationsSonController.createOperationsSonLapse
  )
  .put("/", setAuditFields, OperationsSonController.updateOperationsSon)
  .delete("/", OperationsSonController.deleteOperationsSon);

module.exports = router;
