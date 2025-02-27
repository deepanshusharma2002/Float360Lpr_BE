const express = require("express");
const router = express.Router();
const ContainerAllocationController = require("../../controllers/Opreations/ContainerAllocationController.js");
const setAuditFields = require("../../middleware/setAuditFields.js");
const { uploadMulti } = require("../../middleware/fileHandler.js");

// API routes
router 
  .get("/", ContainerAllocationController.getContainerAllocation)
  .get("/add/bill", ContainerAllocationController.getContainerAllocationAddBill)
  .post(
    "/",
    setAuditFields,
    ContainerAllocationController.createContainerAllocation
  )
  .post(
    "/add/bill",
    setAuditFields,
    uploadMulti.any(),
    ContainerAllocationController.createContainerAllocationAddBill
  )
  .put(
    "/",
    setAuditFields,
    ContainerAllocationController.updateContainerAllocation
  )
  .delete("/", ContainerAllocationController.deleteContainerAllocation);

module.exports = router;
