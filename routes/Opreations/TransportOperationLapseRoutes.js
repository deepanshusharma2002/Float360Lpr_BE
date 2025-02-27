const express = require("express");
const router = express.Router();
const TransportOperationLapseController = require("../../controllers/Opreations/TransportOperationLapseController");
const setAuditFields = require("../../middleware/setAuditFields.js");
const { uploadMulti } = require("../../middleware/fileHandler.js");

// API routes
router
  .get("/", TransportOperationLapseController.getTransportOperationLapse)
  .post(
    "/",
    setAuditFields,
    uploadMulti.any(),
    TransportOperationLapseController.createTransportOperationLapse
  )
  .put(
    "/",
    setAuditFields,
    TransportOperationLapseController.updateTransportOperationLapse
  )
  .delete("/", TransportOperationLapseController.deleteTransportOperationLapse);

module.exports = router;
