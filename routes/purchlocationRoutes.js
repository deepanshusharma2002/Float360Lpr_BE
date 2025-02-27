// routes/api.js
const express = require('express');
const router = express.Router();
// const itemController = require('../controllers/itemController');
const { createPurcLocation, deletePurcLocationById, getAllPurcLocation, getPurcLocationById } = require('../controllers/purchaseLocationController');

// API routes
router
    .get('/', getAllPurcLocation)
    .post('/', createPurcLocation)
    .get('/:id', getPurcLocationById)
    .delete('/:id', deletePurcLocationById)

module.exports = router;
