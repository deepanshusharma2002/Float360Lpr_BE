const express = require("express");
const router = express.Router();
const OperationsNafdacMasterController = require("../../controllers/Opreations/NafdacMasterController.js");
const setAuditFields = require("../../middleware/setAuditFields.js");
const { uploadMulti } = require("../../middleware/fileHandler.js");

// API routes
router
  .get("/", OperationsNafdacMasterController.getOperationsNafdacMasters)

  .post("/date", OperationsNafdacMasterController.addappliedDate)

  .put(
    "/documents",
    setAuditFields,
    uploadMulti.any(),
    OperationsNafdacMasterController.createOperationsNafdacMaster
  )
  
  .post(
    "/lapse",
    setAuditFields,
    uploadMulti.any(),
    OperationsNafdacMasterController.createOperationsNafdacLapse
  )
  .put(
    "/",
    setAuditFields,
    OperationsNafdacMasterController.updateOperationsNafdacMaster
  )

  .delete("/", OperationsNafdacMasterController.deleteOperationsNafdacMaster);

module.exports = router;
