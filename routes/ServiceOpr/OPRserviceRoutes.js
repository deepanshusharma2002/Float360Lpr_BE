const express = require("express");
const router = express.Router();
const ServicePO = require("../../controllers/Quo/QuoController.js");
const ServiceMaster = require("../../controllers/Services/serviceMaster.js");
const ServiceType = require("../../controllers/Services/serviceTypeController.js");
const NewServicePO = require("../../controllers/Services/servicePo.js");
const setAuditFields = require("../../middleware/setAuditFields.js");

// API routes
router
    .get("/pos", ServicePO.getConfirmQuoList)
    .get("/pos/vacceptance", NewServicePO.getServicePoForVendorAcceptance)
    .post("/pos/accpetvend", NewServicePO.confirmpoAcceptance);

//service master
router
    .post('/master', ServiceMaster.createServiceMaster)
    .get('/master', ServiceMaster.getAllServiceMasters)
    .get('/master/drpdn', ServiceMaster.getAllServiceMasters)

router
    .post('/type/create',ServiceType.createServiceType )
    .get('/type/drpdown',ServiceType.getAllServiceTypes )

module.exports = router;