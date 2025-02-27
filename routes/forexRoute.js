const express = require('express');
const router = express.Router();

const ForexAmountController = require('../controllers/ForexAmount.Controller');

router.post('/create', ForexAmountController.createForexAmount);
router.get("/get/:id?", ForexAmountController.getForexAmount);

module.exports = router;