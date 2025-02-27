// routes/api.js
const express = require('express');
const router = express.Router();
const oprItemsController = require('../controllers/oprItemsController');

// API routes
router
    .get('/items', oprItemsController.getOprItem)
    .get('/itembypo', oprItemsController.getOprListbyPoNumber)
    .get('/companypo', oprItemsController.getcompanylistPoNumber)
    .post('/item', oprItemsController.createOprItem)
    .post('/v1/item', oprItemsController.createOprItem2)
    .put('/item', oprItemsController.updateOprItemById)
// .delete('/items', oprItemsController.deleteOprItemById)

module.exports = router; 
