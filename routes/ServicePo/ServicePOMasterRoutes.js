const express = require("express");
const router = express.Router();
const service_po_master_controller = require("../../controllers/ServicePOController/ServicePOMasterController.js");
const setAuditFields = require("../../middleware/setAuditFields.js");

// API routes
router
  .post("/create", setAuditFields, service_po_master_controller.createServicePO)
  .get("/get", service_po_master_controller.getServicePO);


// .get('/get-po-by-id', require.getServicePOById)
// .get('/get-po-by-ids', require.getServicePOByIds)

module.exports = router;
