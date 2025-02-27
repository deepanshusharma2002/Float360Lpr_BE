const express = require("express");
const router = express.Router();
const ShippingLapseController = require("../../controllers/Opreations/ShippingLapseController.js");
const setAuditFields = require("../../middleware/setAuditFields.js");
const { uploadMulti } = require("../../middleware/fileHandler.js");

// API routes
router
  .get("/", ShippingLapseController.getShippingLapses)
  .post(
    "/",
    setAuditFields,
    
    uploadMulti.any(),
    ShippingLapseController.createShippingLapseLapse
  )
  .put("/", setAuditFields, ShippingLapseController.updateShippingLapse)
  .delete("/", ShippingLapseController.deleteShippingLapse);

module.exports = router;
