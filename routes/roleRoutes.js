// routes/api.js
const express = require('express');
const router = express.Router();
const { getAllRole, createRole, getRoleDropDown, updateRoleById, deleteRoleById } = require('../controllers/roleController');
const setAuditFields = require('../middleware/setAuditFields.js');




// API routes
router
    // .get('/roles', getAllRole)
//     .post('/role', createRole)
    // .get('/role/:id', getRoleById)
//     .delete('/role/:id', deleteRoleById);


router
    .get('/list', getAllRole)
    .get('/dropdown', getRoleDropDown)
    .post('/create', setAuditFields, createRole)
    .put('/update', setAuditFields, updateRoleById)
    .delete('/delete', setAuditFields, deleteRoleById);

module.exports = router;
