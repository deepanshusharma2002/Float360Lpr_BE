const express = require("express");
const router = express.Router();
const {
  GetAllCiDataWithPfi,
} = require("../../controllers/Pfi/AssociationController");
const setAuditFields = require("../../middleware/setAuditFields.js");

// API routes
router
  .get("/", GetAllCiDataWithPfi)

module.exports = router;
