const express = require("express");
const router = express.Router();
const AssessmentController = require("../../controllers/Opreations/AssessmentController");
const setAuditFields = require("../../middleware/setAuditFields.js");
const { uploadMulti } = require("../../middleware/fileHandler.js");

// API routes
router
  .get("/", AssessmentController.getAssessments)
  .post(
    "/",
    setAuditFields,
    uploadMulti.any(),
    AssessmentController.createAssessment
  )
  .put("/", setAuditFields, AssessmentController.updateAssessment)
  .delete("/", AssessmentController.deleteAssessment);

module.exports = router;
