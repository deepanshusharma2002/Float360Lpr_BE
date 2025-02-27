
const express = require('express');
const router = express.Router();
// const itemController = require('../controllers/itemController');
const categoryController = require('../controllers/categoryController');
const setAuditFields = require('../middleware/setAuditFields.js');


// API routes
router
    .get('/categories', categoryController.getAllCategory)
    .post('/category',setAuditFields, categoryController.createCategory)
    .get('/category/:id', categoryController.getCategoryById)
    .delete('/category/:id', categoryController.deleteCategory)

module.exports = router;
