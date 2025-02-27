// routes/api.js
const express = require("express");
const router = express.Router();
const CityController = require("../../controllers/Masters/CityController.js");
const setAuditFields = require("../../middleware/setAuditFields.js");

// API routes
router
  .get("/", CityController.getCity)
  .post("/", setAuditFields, CityController.createCity)
  .put("/", CityController.updateCityById)
  .delete("/", CityController.deleteCityById)
  .get("/dropdown", CityController.getCityDropdown);

module.exports = router;
