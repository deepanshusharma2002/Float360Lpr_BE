// routes/api.js
const express = require('express');
const router = express.Router();
const buyHouseController = require('../../controllers/buyHouseController.js');
const setAuditFields = require('../../middleware/setAuditFields.js');
const BuyingHouseController = require('../../controllers/buyingHouseController.js');
const GrnController = require('../../controllers/BuyingHouseController/GrnMasterController.js');


router
    .post('/create', setAuditFields, BuyingHouseController.createBuyingHouse)
    .get('/dropdown', BuyingHouseController.getBhdropDown)
    .get('/list', BuyingHouseController.getAllBuyingHouses)
    .get('/buyinghouses', BuyingHouseController.getBuyingHouseById)
    .put('/update', BuyingHouseController.updateBuyingHouse)
    .delete('/delete', BuyingHouseController.deleteBuyingHouse);

// grn entry 
router
    .post('/grnentry', setAuditFields, GrnController.genrateGrn)
    .get('/grn/list', setAuditFields, GrnController.genrateList)

module.exports = router;

