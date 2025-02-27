
const express = require('express');
const router = express.Router();
// const itemController = require('../controllers/itemController');
const nafdacController = require('../controllers/nafdacController');

// API routes
router
    .get('/nafdacs', nafdacController.getAllNafdacs)
    .post('/nafdac', nafdacController.createNafdac)
    .get('/nafdac/:id', nafdacController.getNafdacById)
    .delete('/nafdac/:id', nafdacController.deleteNafdac)

module.exports = router;
