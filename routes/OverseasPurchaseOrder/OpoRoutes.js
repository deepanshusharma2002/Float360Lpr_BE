const express = require("express");
const router = express.Router();
const OpoController = require("../../controllers/OverseasPurchaseOrder/OpoController.js");
const setAuditFields = require("../../middleware/setAuditFields.js");

// API routes
router
  .get("/", OpoController.getOpo)
  .get("/items", OpoController.getOpoItemByOpoIds)
  .post("/", setAuditFields, OpoController.createOpo)
  .put("/", setAuditFields, OpoController.updateOpo)
  .delete("/", OpoController.deleteOpo);

module.exports = router;
