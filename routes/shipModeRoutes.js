
const express = require('express');
const router = express.Router();

const shipModeController = require('../controllers/shipModeController');

// API routes
router
    .get('/modes', shipModeController.getAllShipmentModes)
    .get('/modes/dropdown', shipModeController.getAllShipmentModeDropdown)
    .post('/mode', shipModeController.createShipmentMode)
    .put('/mode', shipModeController.updateShipmentMode)
    .delete('/mode/', shipModeController.deleteShipmentMode)

module.exports = router;
