const express = require('express');
const router = express.Router();
const packageTypeController = require('../controllers/packageController'); // Adjust the path as necessary
const setAuditFields = require('../middleware/setAuditFields.js');


// Route to create a new package type
router
    .post('/type', setAuditFields, packageTypeController.createPackageType)
    .get('/type', packageTypeController.getAllPackageTypes)
    .get('/type/drpdn', packageTypeController.getAllPackageTypes)
    .get('/type', packageTypeController.getPackageTypeById)
    .put('/type', setAuditFields, packageTypeController.updatePackageType)
    .delete('/type', setAuditFields, packageTypeController.deletePackageType)

module.exports = router; 