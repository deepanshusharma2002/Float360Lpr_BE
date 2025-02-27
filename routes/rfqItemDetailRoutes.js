const express = require('express');
const router = express.Router();
const setAuditFields = require('../middleware/setAuditFields')


const { getAllRfqItem, getRfqItemById, deleteRfqItemById, getRfqItemByRfqid } = require('../controllers/rfqItemsController');

// API routes
router
    .get('/items', getAllRfqItem)
    .get('/itemsbyrfqid', getRfqItemByRfqid)
    .get('/item/:id', getRfqItemById)
    .delete('/item/:id', deleteRfqItemById)
module.exports = router;
