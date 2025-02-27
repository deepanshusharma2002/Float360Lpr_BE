const express = require('express');
const router = express.Router();
const reqDocController = require('../controllers/reqdocMasterController'); // Adjust the path as necessary
const setAuditFields = require('../middleware/setAuditFields.js'); // If you have middleware for auditing

// Required Document Routes
router.post('/create', setAuditFields, reqDocController.createRequiredDocument);
router.get('/list', reqDocController.getAllRequiredDocuments);
router.get('/list/byids', reqDocController.getAllRequiredDocumentsByIds);



module.exports = router;