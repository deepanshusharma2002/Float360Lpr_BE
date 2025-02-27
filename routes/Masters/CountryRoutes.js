// routes/api.js
const express = require("express");
const router = express.Router();
const CountryController = require("../../controllers/Masters/CountryController.js");
const setAuditFields = require("../../middleware/setAuditFields.js");

// API routes
router
  .get("/", CountryController.getCountry)
  .post("/", setAuditFields, CountryController.createCountry)
  .put("/", CountryController.updateCountryById)
  .delete("/", CountryController.deleteCountryById)
  .get("/dropdown", CountryController.getCountryDropdown);

module.exports = router;
