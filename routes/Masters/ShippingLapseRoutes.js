// routes/api.js
const express = require("express");
const router = express.Router();
const ShippingLapseController = require("../../controllers/Masters/ShippingLapseController");
const setAuditFields = require("../../middleware/setAuditFields.js");

// API routes
router
  .get("/", ShippingLapseController.getShippingLapse)
  .post("/", setAuditFields, ShippingLapseController.createShippingLapse)
  .put("/", ShippingLapseController.updateShippingLapseById)
  .delete("/", ShippingLapseController.deleteShippingLapseById)
  .get("/dropdown", ShippingLapseController.getShippingLapseDropdown);

module.exports = router;
