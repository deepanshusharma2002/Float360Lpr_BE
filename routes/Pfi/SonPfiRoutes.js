const express = require("express");
const router = express.Router();
const SonPfiController = require("../../controllers/Pfi/SonPfiController");
const setAuditFields = require("../../middleware/setAuditFields.js");
const { uploadMulti } = require("../../middleware/fileHandler.js");

// API routes
router
  .get("/", SonPfiController.getSonPfiTerms)
  .post("/", setAuditFields, uploadMulti.any(), SonPfiController.createSonPfiTerm)
  .put("/", setAuditFields, SonPfiController.updateSonPfiTerm)
  .delete("/", SonPfiController.deleteSonPfiTerm)
  .get("/bypfiid", SonPfiController.sonByPfiId);

module.exports = router;
