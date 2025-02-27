// routes/api.js
const express = require("express");
const router = express.Router();
const StateController = require("../../controllers/Masters/StateController.js");
const setAuditFields = require("../../middleware/setAuditFields.js");

// API routes
router
  .get("/", StateController.getState)
  .post("/", setAuditFields, StateController.createState)
  .put("/", StateController.updateStateById)
  .delete("/", StateController.deleteStateById)
  .get("/dropdown", StateController.getStateDropdown);

module.exports = router;
