
const express = require('express');
const router = express.Router();
// const itemController = require('../controllers/itemController');
const nafdacCategoryController = require('../controllers/nafdacCategoryController');

// API routes
router
    .get('/names', nafdacCategoryController.getAllNafdacCategoryMasters)
    .post('/name', nafdacCategoryController.createNafdacCategoryMaster)
    .get('/name/:id', nafdacCategoryController.getNafdacCategoryMasterById)
    .delete('/name/:id', nafdacCategoryController.deleteNafdacCategoryMaster)

module.exports = router;
