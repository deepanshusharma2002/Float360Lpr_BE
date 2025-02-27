const express = require('express');
const router = express.Router();
const {
    createItemCategory,
    getAllItemCategories,
    updateItemCategory,
    deleteItemCategory
} = require('../controllers/itemCategoryController.js');
const setAuditFields = require('../middleware/setAuditFields.js');


// API routes for item categories
router
    .post('/itemcategory', setAuditFields, createItemCategory)
    .get('/itemcategories', getAllItemCategories)
    .put('/itemcategory', updateItemCategory)
    .delete('/itemcategory', deleteItemCategory);

module.exports = router;
