const express = require("express");
const router = express.Router();
const NafdacPfiController = require("../../controllers/Pfi/NafdacPfiController");
const setAuditFields = require("../../middleware/setAuditFields.js");
const { uploadMulti } = require("../../middleware/fileHandler.js");

// API routes
router
  .get("/", NafdacPfiController.getNafdacPfiTerms)
  .post("/", setAuditFields, uploadMulti.any(), NafdacPfiController.createNafdacPfiTerm)
  .put("/", setAuditFields, NafdacPfiController.updateNafdacPfiTerm)
  .delete("/", NafdacPfiController.deleteNafdacPfiTerm)
  .get("/bypfiid", NafdacPfiController.NafdacByPfiId);

module.exports = router;
