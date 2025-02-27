
const express = require('express');
const router = express.Router();

const seriesController = require('../controllers/statusController');

// API routes
router
    .get('/', seriesController.getAllStatus)
    .post('/', seriesController.createStatus)
    .put('/', seriesController.updateStatus)
    .delete('/', seriesController.deleteStatus)

module.exports = router;
