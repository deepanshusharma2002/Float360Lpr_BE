// // routes/api.js
// const express = require('express');
// const router = express.Router();
// // const itemController = require('../controllers/itemController');
// const { createDept, deleteDeptById, getAllDept, getDeptById } = require('../controllers/departmentController');

// // API routes
// router
//     .get('/depts', getAllDept)
//     .post('/dept', createDept)
//     .get('/dept/:id', getDeptById)
//     .delete('/dept/:id', deleteDeptById)




// module.exports = router;


// designationRoutes.js

// const express = require('express');
// const router = express.Router();
// const {
//     createDesignation,
//     deleteDesignationById,
//     getAllDesignations,
//     getDesignationById,
//     updateDesignationById
// } = require('../controllers/designation_masterController');

// // API routes
// router
//     .get('/designations', getAllDesignations)
//     .post('/designation', createDesignation)
//     .get('/designation/:id', getDesignationById)
//     .put('/designation/:id', updateDesignationById)
//     .delete('/designation/:id', deleteDesignationById);

// module.exports = router;


// departmentRoutes.js

const express = require('express');
const router = express.Router();
const {
    createDepartment,
    getAllDepartments,
    getDepartmentById,
    updateDepartmentById,
    deleteDepartmentById,
    getDesignation
} = require('../controllers/deptController');
const desigController = require('../controllers/desigController');
const setAuditFields = require('../middleware/setAuditFields.js');


// API routes
router
    .get('/departments', getAllDepartments)       
    .post('/department', setAuditFields, createDepartment)
    .put('/department', updateDepartmentById)
    .delete('/department', deleteDepartmentById)
    .get('/designations', desigController.getAllDesignations)
    .post('/designation', desigController.createDesignation)
    .put('/designation', desigController.updateDesignationById)
    .delete('/designation', desigController.deleteDesignationById)
    .get('/desigbycompid', getDesignation)

module.exports = router;

