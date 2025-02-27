const express = require("express");
const router = express.Router();
const FormMController = require("../../controllers/Pfi/FormMController.js");
const setAuditFields = require("../../middleware/setAuditFields.js");
const { uploadMulti } = require("../../middleware/fileHandler.js");

// API routes
router
  .get("/", FormMController.getFormMTerms)
  .get('/bypfiid', FormMController.formm_docby_by_pfi_id)
  .post("/tryvalidatedoc", uploadMulti.any(), FormMController.tryDocValidate)
  .post("/validatedoc", uploadMulti.any(), FormMController.ValidateFromMDoc)
  .post("/", setAuditFields, uploadMulti.any(), FormMController.createFormMTerm)
  .put("/", setAuditFields, FormMController.updateFormMTerm)
  .delete("/", FormMController.deleteFormMTerm);

module.exports = router;
