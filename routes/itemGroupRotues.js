const express = require('express');
const router = express.Router();
const itemGroupController = require('../controllers/itemGroupController.js')
const itemSubGroupController = require('../controllers/itemSubGroupController.js')
const itemSuperGroupController = require('../controllers/itemSuperGroupController.js')
const setAuditFields = require('../middleware/setAuditFields.js');


// API routes for item categories
router
    .post('/group', setAuditFields, itemGroupController.createItemGroup)
    .get('/groups', itemGroupController.getAllItemGroups)
    .get('/group/:id', itemGroupController.getItemGroupById)
    .put('/itemcategory/:id', setAuditFields, itemGroupController.updateItemGroup)
    .delete('/itemcategory/:id', itemGroupController.deleteItemGroup)


// this for main group
router
    .post('/create', setAuditFields, itemGroupController.createItemGroup)
    .get('/list', itemGroupController.getAllItemGroups)
    .get('/dropdown', itemGroupController.itemGropuDrpDn)
    .put('/update', setAuditFields, itemGroupController.updateItemGroup)
    .delete('/delete', setAuditFields, itemGroupController.deleteItemGroup);


//Item Sub Group
router
    .post('/subgroup/create', setAuditFields, itemSubGroupController.createItemSubGroup)
    .get('/subgroup/list', itemSubGroupController.getAllItemSubGroups)
    .put('/subgroup/update', setAuditFields, itemSubGroupController.updateItemSubGroup)
    .delete('/subgroup/delete', setAuditFields, itemSubGroupController.deleteItemSubGroup);

    
// Item Super Group Routes
router
    .post('/supercategory', setAuditFields, itemSuperGroupController.createItemSuperGroup)
    .get('/supercategory', itemSuperGroupController.getAllItemSuperGroups)
    .put('/supercategory', setAuditFields, itemSuperGroupController.updateItemSuperGroup)
    .delete('/supercategory', setAuditFields, itemSuperGroupController.deleteItemSuperGroup);


//Item Sub category
router
    .post('/subcategory', setAuditFields, itemSubGroupController.createItemSubGroup)
    .get('/subcategory', itemSubGroupController.getAllItemSubGroups)
    .put('/subcategory', setAuditFields, itemSubGroupController.updateItemSubGroup)
    .delete('/subcategory', setAuditFields, itemSubGroupController.deleteItemSubGroup);

//category
router
    .post('/', setAuditFields, itemGroupController.createItemGroup2)
    .get('/', itemGroupController.getItemCategoryBySuperCate);

module.exports = router;
