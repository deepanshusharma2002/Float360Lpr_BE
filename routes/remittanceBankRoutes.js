const express = require('express');
const router = express.Router();
const remittance = require('../controllers/RemittanceBank/RemittanceBankController'); 


router.post('/',remittance.createRemittanceBank);
router.get('/', remittance.getRemittanceBanks);



module.exports = router;