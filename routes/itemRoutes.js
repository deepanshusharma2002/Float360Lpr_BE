// routes/api.js
const express = require('express');
const router = express.Router();
// const itemController = require('../controllers/itemController');
const itemController = require('../controllers/itemController');
const setAuditFields = require('../middleware/setAuditFields.js');
const upload = require('../utilites/handlefile.js');


// API routes
router
    .get('/items', itemController.getAllItems)
    .get('/item/:id', itemController.getItemById)
    .post('/item', upload.single('item_image'), setAuditFields, itemController.createItem)
    .delete('/item/:id', itemController.deleteItem)
module.exports = router;
