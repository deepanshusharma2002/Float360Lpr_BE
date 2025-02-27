
const express = require('express');
const router = express.Router();
// const itemController = require('../controllers/itemController');
const {
    getAllMenu,
    getMenuById,
    deleteMenuById,
    createMenu } = require('../controllers/menuController');

// API routes
router
    .get('/', getAllMenu)
    .post('/', createMenu)
    .get('/:id', getMenuById)
    .delete('/:id', deleteMenuById)




module.exports = router;
