const express = require('express');
const router = express.Router();
const vendorTypeMasterController = require('../controllers/vendorTypeMasterController');

// Routes for CRUD operations
router.post('/', vendorTypeMasterController.createVendorType);
router.get('/', vendorTypeMasterController.getAllVendorTypes);
router.get('/dropdown', vendorTypeMasterController.getVtypefodropdown);
router.get('/:id', vendorTypeMasterController.getVendorTypeById);
router.put('/:id', vendorTypeMasterController.updateVendorType);
router.delete('/:id', vendorTypeMasterController.deleteVendorType);
module.exports = router;