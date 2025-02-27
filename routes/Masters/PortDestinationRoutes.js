// routes/api.js
const express = require("express");
const router = express.Router();
const PortDestinationController = require("../../controllers/Masters/PortDestinationController.js");
const setAuditFields = require("../../middleware/setAuditFields.js");

// API routes
router
  .get("/", PortDestinationController.getPortDestination)
  .post("/", setAuditFields, PortDestinationController.createPortDestination)
  .put("/", PortDestinationController.updatePortDestinationById)
  .delete("/", PortDestinationController.deletePortDestinationById)
  .get("/dropdown", PortDestinationController.getPortDestinationDropdown);

module.exports = router;
