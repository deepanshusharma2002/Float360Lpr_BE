const express = require("express");
const router = express.Router();
const serviceRoute = require("../../controllers/ServicePOController/ServiceListController.js");
const setAuditFields = require("../../middleware/setAuditFields.js");

// API routes
router
  .post("/", serviceRoute.createServiceList)
module.exports = router;
