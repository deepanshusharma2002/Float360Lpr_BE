const express = require("express");
const router = express.Router();
const setAuditFields = require("../../middleware/setAuditFields.js");
const ServiceQUO = require("../../controllers/Services/serviceQuoteController.js");


// API routes
router
    .get("/get", ServiceQUO.getAllServiceQuotes)
    .post("/create", ServiceQUO.createServiceQuote);

module.exports = router;