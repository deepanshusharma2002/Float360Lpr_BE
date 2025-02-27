const express = require("express");
const router = express.Router();
const PaarController = require("../../controllers/Pfi/PaarController");
const setAuditFields = require("../../middleware/setAuditFields.js");
const { uploadMulti } = require("../../middleware/fileHandler.js");

// API routes
router
  .get("/", PaarController.getPaarTerms)
  .post(
    "/",
    setAuditFields,
    uploadMulti.any(),
    PaarController.createPaarTerm
  )
   .post(
    "/validatepaar",
    uploadMulti.any(),
    PaarController.ValidatePaarDoc
  )
  .post(
    "/revise/request",
    setAuditFields,
    uploadMulti.any(),
    PaarController.createPaarRequest
  )
  .put("/", setAuditFields, PaarController.updatePaarTerm)
  .delete("/", PaarController.deletePaarTerm);

module.exports = router;
