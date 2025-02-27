// // routes/api.js
// const express = require('express');
// const router = express.Router();
// // const itemController = require('../controllers/itemController');
// const { createDivision, deleteDivisionById, getAllDivision, getDivisionById, updateDivision } = require('../controllers/divisionController');
// const setAuditFields = require('../middleware/setAuditFields.js');


// // API routes
// router
//     .get('/get', getAllDivision)
//     .post('/create', setAuditFields, createDivision)
//     .put('/update', setAuditFields, updateDivision)
//     .get('/:id', getDivisionById)
//     .delete('/:id', deleteDivisionById)
// module.exports = router;


// routes/api.js
const express = require('express');
const router = express.Router();
const { createDivision, deleteDivisionById, getDivisionDropDn, getAllDivision, getDivisionById, updateDivision } = require('../controllers/divisionController');
const setAuditFields = require('../middleware/setAuditFields.js');

// API routes
router
    .get('/divisions', getAllDivision)
    .get('/dropdown', getDivisionDropDn)
    .post('/division', setAuditFields, createDivision)
    .get('/division/:id', getDivisionById)
    .delete('/delete', setAuditFields, deleteDivisionById)
    .put('/update', setAuditFields, updateDivision);

module.exports = router;