// routes/api.js
const express = require('express');
const router = express.Router();
const { getAddressByCompanyId } = require('../controllers/AddressController/addressController')
const { getAddressTypeDropDown } = require('../controllers/AddressController/addressType')

// API routes
router
    .get('/bycompanyid', getAddressByCompanyId)
    .get('/type', getAddressTypeDropDown)

module.exports = router;

