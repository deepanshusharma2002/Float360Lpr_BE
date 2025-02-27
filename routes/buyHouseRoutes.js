// routes/api.js
const express = require('express');
const router = express.Router();
const buyHouseController = require('../controllers/buyHouseController');
const setAuditFields = require('../middleware/setAuditFields.js');
const BuyingHouseController = require('../controllers/buyingHouseController.js');


// // API routes
// router

//     .get('/houses', buyHouseController.getBuyHouse)
//     .post('/house',setAuditFields, buyHouseController.createBuyHouse)
//     .put('/house', buyHouseController.updateBuyHouseById)
//     .delete('/house/:id', buyHouseController.deleteBuyHouseById)

// module.exports = router;

// Route to create a new BuyingHouse

router
    .post('/buyinghouses', BuyingHouseController.createBuyingHouse)
    .get('/dropdown', BuyingHouseController.getBhdropDown)
    .get('/buyinghouses', BuyingHouseController.getAllBuyingHouses)
    .get('/buyinghouses/:id', BuyingHouseController.getBuyingHouseById)
    .put('/buyinghouses/:id', BuyingHouseController.updateBuyingHouse)
    .delete('/buyinghouses/:id', BuyingHouseController.deleteBuyingHouse);


module.exports = router;

