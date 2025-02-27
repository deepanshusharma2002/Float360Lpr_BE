const express = require("express");
const router = express.Router();
const ShippingInstructionsController = require("../../controllers/ShippingController/ShippingInstructionsController.js");
const setAuditFields = require("../../middleware/setAuditFields.js");
const { uploadMulti } = require("../../middleware/fileHandler.js");

// API routes
router
  .get("/", ShippingInstructionsController.getShippingInstructionsTerms)
  .post(
    "/",
    setAuditFields,
    uploadMulti.any(),
    ShippingInstructionsController.createShippingInstructionsTerm
  )
  .put("/", setAuditFields, ShippingInstructionsController.updateShippingInstructionsTerm)
  .delete("/", ShippingInstructionsController.deleteShippingInstructionsTerm);

module.exports = router;
