// routes/api.js
const express = require('express');
const router = express.Router();
const verticalController = require('../controllers/verticalController');

const multer = require('multer');
const upload = multer();

// API routes
router
    .get('/', verticalController.getVertical)
    .get('/dropdown', verticalController.verticalDropDown)
    .post('/', upload.single('fieldName'), verticalController.createVertical)
    .put('/', verticalController.updateVerticalById)
    .delete('/', verticalController.deleteVerticalById)

module.exports = router;
