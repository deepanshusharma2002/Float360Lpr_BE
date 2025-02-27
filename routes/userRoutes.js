// routes/api.js
const express = require('express');
const router = express.Router();
// const itemController = require('../controllers/itemController');
const userController = require('../controllers/userControllers');
const setAuditFields = require('../middleware/setAuditFields.js');




// API routes
router
    .get('/users', userController.getAllUser)
    .post('/user', setAuditFields, userController.createUser)
    .post('/login', userController.loginUser)
// .get('/user/:id', getUserById)
// .delete('/user/:id', deleteUserById)

module.exports = router;
