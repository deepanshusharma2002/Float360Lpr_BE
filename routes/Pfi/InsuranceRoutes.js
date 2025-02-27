const express = require("express");
const router = express.Router();
const InsuranceController = require("../../controllers/Pfi/InsuranceController");
const setAuditFields = require("../../middleware/setAuditFields.js");
const { uploadMulti } = require("../../middleware/fileHandler.js");

// API routes
router
  .get("/", InsuranceController.getInsuranceTerms)
  .post("/", setAuditFields, uploadMulti.any(), InsuranceController.createInsuranceTerm)
  .put("/", setAuditFields, InsuranceController.updateInsuranceTerm)
  .delete("/", InsuranceController.deleteInsuranceTerm)
  .get("/bypfiid", InsuranceController.InsuranceByPfi_id);

module.exports = router;
