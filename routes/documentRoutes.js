const express = require('express');
const router = express.Router();
const documentController = require('../controllers/documentController');
const upload = require('../utilites/handlefile.js');
const setAuditFields = require('../middleware/setAuditFields.js');


// Routes for document CRUD operations
router.post('/create',upload.any(),setAuditFields, documentController.createDocument);
router.get('/', documentController.getAllDocuments);
router.get('/bydoc_id', documentController.getDocumentById);
router.get('/docbyentityid', documentController.getpoDocumentById);
// router.get('/:id', documentController.getDocumentById);
// router.put('/:id', documentController.updateDocument);
router.delete('/', documentController.deleteDocument);

module.exports = router;
