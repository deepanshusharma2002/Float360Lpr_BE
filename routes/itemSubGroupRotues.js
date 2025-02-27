const express = require('express');
const router = express.Router();
const itemSubGroupController = require('../controllers/itemSubGroupController.js')
const setAuditFields = require('../middleware/setAuditFields.js');


// API routes for item categories
router
    .post('/subgroup', setAuditFields, itemSubGroupController.createItemSubGroup)
    .get('/subgroups', itemSubGroupController.getAllItemGroupsByGropuid)
    // .get('/category', itemSubGroupController.getItemCategoryBySuperCate)
// .get('/subgroup/:id', itemSubGroupController.getItemGroupById)
// .put('/subgroup/:id', itemSubGroupController.updateItemGroup)
// .delete('/subgroup/:id', itemSubGroupController.deleteItemGroup);

module.exports = router;
