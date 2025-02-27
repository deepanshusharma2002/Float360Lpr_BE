// routes/api.js
const express = require('express');
const router = express.Router();
const quotationItemsController = require('../controllers/quotationItemsController');
const setAuditFields = require('../middleware/setAuditFields.js');


// API routes
router
    .get('/items', quotationItemsController.getQuotationItem)
    .post('/item', setAuditFields, quotationItemsController.createQuotationItem)
    .put('/item/:id', quotationItemsController.updateQuotationItemById)
    .delete('/item/:id', quotationItemsController.deleteQuotationItemById)

module.exports = router;

