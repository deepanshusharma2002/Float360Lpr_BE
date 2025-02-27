const express = require('express');
const router = express.Router();
const { createBranch, deleteBranchById, getAllBranch, updateBranch } = require('../controllers/branchController');
const setAuditFields = require('../middleware/setAuditFields.js');


// API routes
router
        .get('/branches', getAllBranch)
        .post('/branch', setAuditFields, createBranch)
        .delete('/branch', setAuditFields, deleteBranchById)
        .put('/branch', setAuditFields, updateBranch)
module.exports = router;
