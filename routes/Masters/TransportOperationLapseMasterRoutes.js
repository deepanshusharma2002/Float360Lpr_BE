// routes/api.js
const express = require("express");
const router = express.Router();
const TransportOpreationLapseController = require("../../controllers/Masters/TransportOperationLapseMasterController");
const setAuditFields = require("../../middleware/setAuditFields.js");

// API routes
router
  .get("/", TransportOpreationLapseController.getTransportOpreationLapse)
  .post(
    "/",
    setAuditFields,
    TransportOpreationLapseController.createTransportOpreationLapse
  )
  .put("/", TransportOpreationLapseController.updateTransportOpreationLapseById)
  .delete(
    "/",
    TransportOpreationLapseController.deleteTransportOpreationLapseById
  )
  .get(
    "/dropdown",
    TransportOpreationLapseController.getTransportOpreationLapseDropdown
  );

module.exports = router;
