// routes/api.js
const express = require('express');
const router = express.Router();
// const itemController = require('../controllers/itemController');
const criaController = require('../controllers/criaController');
const setAuditFields = require('../middleware/setAuditFields.js');


// API routes
router
    .get('/crias', criaController.getAllCriaEntries)
    .post('/cria', setAuditFields, criaController.createCriaEntry)
    .delete('/cria/:id', criaController.deleteCriaEntry)


module.exports = router;
