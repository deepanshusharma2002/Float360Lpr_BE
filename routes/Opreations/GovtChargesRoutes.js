const express = require("express");
const router = express.Router();
const GovtChargesController = require("../../controllers/Opreations/GovtChargesController");
const setAuditFields = require("../../middleware/setAuditFields.js");
const { uploadMulti } = require("../../middleware/fileHandler.js");

// API routes
router
  .get("/", GovtChargesController.getGovtCharges)
  .post(
    "/",
    setAuditFields,
    uploadMulti.any(),
    GovtChargesController.createGovtCharges
  )
  .post(
    "/other",
    setAuditFields,
    GovtChargesController.createOtherCharges
  )
  .put("/", setAuditFields, GovtChargesController.updateGovtCharges)
  .delete("/", GovtChargesController.deleteGovtCharges);

module.exports = router;
