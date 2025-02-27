const express = require("express");
const router = express.Router();
const OperationsNafdacController = require("../../controllers/Opreations/NafdacController");
const OperationsNafdacMasterController = require("../../controllers/Opreations/NafdacMasterController.js");

const setAuditFields = require("../../middleware/setAuditFields.js");
const { uploadMulti } = require("../../middleware/fileHandler.js");

// API routes
router
  .post("/add_date", OperationsNafdacMasterController.addappliedDate)
  .get("/", OperationsNafdacController.getOperationsNafdacs)  
  .put(
    "/", setAuditFields,
    uploadMulti.any(),
    OperationsNafdacController.createOperationsNafdac
  )
  .put("/", setAuditFields, OperationsNafdacController.updateOperationsNafdac)
  
  .delete("/", OperationsNafdacController.deleteOperationsNafdac);

module.exports = router;
