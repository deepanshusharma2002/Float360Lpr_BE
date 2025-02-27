const express = require("express");
const router = express.Router();
const AddContainerController = require("../../controllers/Opreations/AddShipmentContainerController.js");
const setAuditFields = require("../../middleware/setAuditFields.js");
const { uploadMulti } = require("../../middleware/fileHandler.js");

// API routes
router
  .get("/", AddContainerController.getAddContainer)
  .post(
    "/",
    setAuditFields,
    uploadMulti.any(),
    AddContainerController.createAddContainer
  )
  .put("/", setAuditFields, AddContainerController.updateAddContainer)
  .delete("/", AddContainerController.deleteAddContainer);

module.exports = router;
