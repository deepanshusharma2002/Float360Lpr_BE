const express = require("express");
const router = express.Router();
const LetterOfCreditController = require("../../controllers/Pfi/LetterOfCreditController.js");
const setAuditFields = require("../../middleware/setAuditFields.js");
const { uploadMulti } = require("../../middleware/fileHandler.js");

// API routes
router
  .get("/", LetterOfCreditController.getLetterOfCreditTerms)
  .post(
    "/",
    setAuditFields,
    uploadMulti.any(),
    LetterOfCreditController.createLetterOfCreditTerm
  )
  .put("/", setAuditFields, LetterOfCreditController.updateLetterOfCreditTerm)
  .delete("/", LetterOfCreditController.deleteLetterOfCreditTerm)
  .get("/bypfiid", LetterOfCreditController.lcByPfiId);

module.exports = router;
