const express = require("express");
const router = express.Router();
const servicePOQuotationController = require('../../controllers/ServicePOController/QuoteServicePOControlller.js');
const setAuditFields = require("../../middleware/setAuditFields.js");
const { uploadMulti } = require("../../middleware/fileHandler.js");

// API routes 
router
    .post('/', uploadMulti.any(), servicePOQuotationController.createServicePOQuotation)
    .get('/', servicePOQuotationController.getServicePOQuotations)
    .post('/generate-po', servicePOQuotationController.generateServicePO);
module.exports = router;



