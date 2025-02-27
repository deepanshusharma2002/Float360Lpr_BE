const express = require('express');
const router = express.Router();
const GdnController = require('../controllers/GdnGrnController/GdnController.js');
const GrnController = require('../controllers/GdnGrnController/GrnController.js');
const upload = require('../utilites/handlefile.js');
const setAuditFields = require('../middleware/setAuditFields.js');


//GDN Routes
router
    .post('/gdn', setAuditFields, GdnController.createGdn)
    .get('/gdn',  GdnController.getAllGdn);



//GRN Routes

router
    .post("/grn", GrnController.createGrn)
    .get("/grn", GrnController.getAllGrn)

module.exports = router;
