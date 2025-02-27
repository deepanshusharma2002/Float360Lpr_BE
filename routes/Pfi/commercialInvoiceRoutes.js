const express = require("express");
const router = express.Router();
const CommercialInvoiceController = require("../../controllers/Pfi/CommercialInvoiceController");
const CommercialInvoiceControllerGet = require("../../controllers/Pfi/GetApiAgainstCI.js");
const CommercialInvoiceControllerCreate = require("../../controllers/Pfi/CreateFormsAgainstCIController");
const setAuditFields = require("../../middleware/setAuditFields.js");
const { uploadMulti } = require("../../middleware/fileHandler.js");

// API routes
router
  .get("/", CommercialInvoiceController.getCommercialInvoiceTerms)
  .post("/", setAuditFields, CommercialInvoiceController.createCommercialInvoiceTerm)
  .put("/", setAuditFields, CommercialInvoiceController.updateCommercialInvoiceTerm)
  .delete("/", CommercialInvoiceController.deleteCommercialInvoiceTerm);

  //Get Api's By CI ID
  router
  .get("/package/details", CommercialInvoiceControllerGet.GetContainerByBL)
  .get("/itemlist", CommercialInvoiceControllerGet.GetContainerItemsByCiId)
  .get("/shipping/expense/lapse", setAuditFields, CommercialInvoiceController.GetShippingExpenseLapseByCiId)
  .get("/shipping/expense", setAuditFields, CommercialInvoiceController.GetShippingExpenseByCiId)
  .get("/custom/clearance", CommercialInvoiceController.getCustomClearance)
  .get("/container/allocation", CommercialInvoiceControllerGet.GetContainerAllocationByCiId)
  .get("/lapse", CommercialInvoiceControllerGet.GetLapse)
  .get("/nafdac/penalty", CommercialInvoiceControllerGet.GetNafdacExpenseOerations)

    //Submit data Against CI
    router
    .post("/soncap", setAuditFields, CommercialInvoiceController.createSoncap)
    .post("/nafdac/inspection/expense", setAuditFields, CommercialInvoiceController.createNafdac)
    .post("/shipping/expense/validity/do", setAuditFields, CommercialInvoiceController.AddDOValidateDateContainer)
    .post("/shipping/expense", setAuditFields, uploadMulti.any(), CommercialInvoiceController.createShippingExpense)
    .post("/nafdac/clearance", setAuditFields, CommercialInvoiceController.createNafdacClearing)
    .post("/nafdac/penalty", setAuditFields, CommercialInvoiceController.createNafdacPenalty)
    .post("/other/govt/charges", setAuditFields, CommercialInvoiceController.createOtherGovtCharges)
    .post("/custom/clearance", setAuditFields, CommercialInvoiceController.createCustomClearance)
    .post("/exchange/controll", setAuditFields, uploadMulti.any(), CommercialInvoiceControllerCreate.CreateContainerAllocationByCiId)
    .post("/lapse", setAuditFields, uploadMulti.any(), CommercialInvoiceController.createLapse)

module.exports = router;
