// -------------------------------IMPORT PROJECTS -------------------------------
const express = require("express");
const handleError = require("./middleware/errorHandler");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger-output.json");
const cors = require("cors");
const { tryPdfParse, uploadpdf } = require("./utilites/UploadPdfParseMulter.js");

// -------------------------------IMPORT ROUTE -------------------------------
const itemRoute = require("./routes/itemRoutes");
const poRoute = require("./routes/poRoutes");
const rfqMasterRoute = require("./routes/rfqMasterRoutes");
const rfqItemDetailRoute = require("./routes/rfqItemDetailRoutes");
const userRoute = require("./routes/userRoutes");
const roleRoute = require("./routes/roleRoutes");
const branchRoute = require("./routes/branchRoutes");
const deptRoute = require("./routes/deptRoutes");
const purchaseLocRoute = require("./routes/purchlocationRoutes");
const divisionRoute = require("./routes/divisionRoutes");
const vendorRoute = require("./routes/vendorRoutes");
const menuRoute = require("./routes/menuRoutes");
const uomRoute = require("./routes/uomRoutes");
const oprRouter = require("./routes/oprRoutes.js");
const shipModeRouter = require("./routes/shipModeRoutes.js");
const oprItemsRouter = require("./routes/oprItemsRoutes.js");
const buyHouseRouter = require("./routes/buyHouseRoutes.js");
const quotationRouter = require("./routes/quotationRoutes.js");
const quotationItemsRouter = require("./routes/quotationItemsRoutes");
const criaRouter = require("./routes/criaRoutes.js");
const nafdacCategoryRouter = require("./routes/nafdacCategoryRotues.js");
const nafdacRouter = require("./routes/nafdacRoutes.js");
const verticalRouter = require("./routes/verticalRoutes");
const companyRouter = require("./routes/companyRoutes");
const deliveryTimelineRouter = require("./routes/deliveryTimelineRoutes");
const deliveryTermsRouter = require("./routes/deliveryTermsRoutes");
const penaltyTermsRoutes = require("./routes/penaltyTermsRoutes");
const additionalCostRouter = require("./routes/additionalCostRoutes");
const leadTimeRouter = require("./routes/leadTimeRoutes");
const mailRoutes = require("./routes/mailRoutes.js");
const pfiRoutes = require("./routes/pfiRoutes.js");
const vendorTypeMasterRoutes = require("./routes/vendorTypeMasterRoutes");
const addressRoutes = require("./routes/addressRoutes.js");
const buyingHouseRoutes = require("./routes/buyHouseRoutes.js");
const buyingHouseRoutes2 = require("./routes/BuyingHouse/buyingHouseRoutes.js");
const SeriesRoutes = require("./routes/seriesRoutes,js");
const StatusRoutes = require("./routes/statusRoutes.js");
const GdnGrnNotes = require("./routes/GdnGrnRoutes.js")


//category
const categoryRoute = require("./routes/categoryRoutes");
const itemCategoryRouter = require("./routes/itemCategoryRoutes.js");
const itemGroupRouter = require("./routes/itemGroupRotues.js");
const itemSubGroupRouter = require("./routes/itemSubGroupRotues.js");

//Masters
const ContainerTypesMasters = require("./routes/Masters/ContainerTypesMastersRoutes.js");
const ShippingAdviseContainerTypesMasters = require("./routes/Masters/ShippingAdviseContainerTypeRoutes");
const PaymentTermContainer = require("./routes/Masters/PaymentTermContainerMasterRoutes.js");
const TransportOperationLapse = require("./routes/Masters/TransportOperationLapseMasterRoutes.js");
const TransportPaymentTypeLapse = require("./routes/Masters/PaymentTypeTransportRoutes.js");
const AddExpenseChargesRoutes = require("./routes/Masters/AddExpenseChargesRoutes");
const PaymentTypeChargesRoutes = require("./routes/Masters/PaymentTypeChargesRoutes.js");
const ShippingLapsesRoutes = require("./routes/Masters/ShippingLapseRoutes");
const PortDestinationRoutes = require("./routes/Masters/PortDestinationRoutes.js");
const CountryRoutes = require("./routes/Masters/CountryRoutes.js");
const StateRoutes = require("./routes/Masters/StateRoutes.js");
const CityRoutes = require("./routes/Masters/CityRoutes.js");
const ShipmentTypeRoutes = require("./routes/Masters/ShipmentTypeRoutes.js");
const InitiationPointMasterRoutes = require("./routes/Masters/InitiationPointMasterRoutes.js");


// Service po routes
const ServicePOQuotationRoutes = require("./routes/ServicePo/ServicePOQuotationRoutes.js");
const service_list = require("./routes/ServicePo/ServiceListRoutes.js");
const servicePO = require("./routes/ServicePo/ServicePOMasterRoutes.js")


// forex Routes
const forexAmount = require("./routes/forexRoute.js")

// Rate Card routes

const RateCardRoutes = require("./routes/ServicePo/RateCardRoutes.js");  


//PFI
const CommercialInvoiceRoutes = require("./routes/Pfi/commercialInvoiceRoutes.js");
const InsuranceRoutes = require("./routes/Pfi/InsuranceRoutes.js");
const FormMRoutes = require("./routes/Pfi/formMRoutes");
const LetterOfCreditTermsRoutes = require("./routes/Pfi/LetterOfCreditRoutes.js");
const SonPfiRoutes = require("./routes/Pfi/SonPfiRoutes");
const NafdacPfiRoutes = require("./routes/Pfi/NafdacPfiRoutes");
const PaarRoutes = require("./routes/Pfi/PaarRoutes");



const CurrencyConversionRoutes = require("./routes/CurrencyConversionRoutes.js");


//Get Data CI against PFI, FormM,
const CommercialInvoiceAllData = require("./routes/Pfi/AssociationRoutes");


//Opreations
const AssessmentRoutes = require("./routes/Opreations/AssessmentRoutes");

// const OperationsNafdacRoutes = require("./routes/Opreations/NafdacRoutes");
const OperationsNafdacMasterRoutes = require("./routes/Opreations/NafdacMasterRoutes");
const OperationsSonRoutes = require("./routes/Opreations/SonRoutes");
const TransportOperationLapseRoutes = require("./routes/Opreations/TransportOperationLapseRoutes");
const ContainerAllocationRoutes = require("./routes/Opreations/ContainerAllocationRoutes");
const GovtChargesRoutes = require("./routes/Opreations/GovtChargesRoutes");
const ShippingLapseRoutes = require("./routes/Opreations/ShippingLapseRoutes");
const AddServiceContainer = require("./routes/Opreations/AddShippingContainerRoutes.js");


//shipping
const ShippingMasterRoutes = require("./routes/Shipping/shippingMasterRoutes.js");
const ContainerRoutes = require("./routes/Shipping/containerRoutes.js");
const VesselRoutes = require("./routes/Shipping/vesselRoutes.js");
const ShippingInstructionsRoutes = require("./routes/Shipping/ShippingInstructionsRoutes.js");
const packageRoutes = require('./routes/packageRoutes.js');
const ShippingAdviseRoutes = require('./routes/Shipping/ShippingAdviseRoutes.js');


//payments
const paymentTypeMasterRoutes = require("./routes/paymentTypeMasterRoutes");
const paymentRequestMasterRoutes = require("./routes/paymentRequestMasterRoutes");
const paymentRequestTransactionsMasterRoutes = require("./routes/PaymentRequestTransactionsMaster.js");
const paymentTermsRouter = require("./routes/paymentTermsRoutes");
const payment = require("./routes/paymentRoutes.js");
const ApprovalRoutes = require('./routes/approvalRoutes.js')

//LprGrn 
const grnLPr = require('./routes/GrnLprRoutes/GrnRoutes.js')

//OPO
const OpoRoutes = require('./routes/OverseasPurchaseOrder/OpoRoutes')

//documents
const documentRoutes = require('./routes/documentRoutes.js')
const reqdocRoutes = require('./routes/reqdocmasterRoutes.js')
const masterRoutes = require("./routes/Masters/MasterRoutes.js")

//Re3mittance 
const remittance = require("./routes/remittanceBankRoutes.js")


//services
const servcenewRoutes = require("./routes/ServiceOpr/ServiceQuote.js");
const serviceRoutes = require("./routes/ServiceOpr/OPRserviceRoutes.js");
const fetchData = require("./controllers/Pfi/AssociationController.js");
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

//swagger
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

//document Master
app.use('/api/v1/service', servcenewRoutes)
app.use('/api/document', documentRoutes);
app.use('/api/reqdoc', reqdocRoutes);


//category ye new wala jaha sare category jayega
app.use("/api/category", itemGroupRouter);


//Master
app.use("/api/master", masterRoutes)


// Routes
app.use("/api/user", userRoute);
app.use("/api/role", roleRoute);
app.use("/api/vendor", vendorRoute);
app.use("/api/item", itemRoute);
app.use("/api/cria", criaRouter);
app.use("/api/nafdaccategory", nafdacCategoryRouter);
app.use("/api/nafdac", nafdacRouter);
app.use("/api/itemgroup", itemGroupRouter);
app.use("/api/itemsubgroup", itemSubGroupRouter);
app.use("/api/opr", oprRouter);
// app.use("/api/opritem", oprItemsRouter);
app.use("/api/rfq", rfqMasterRoute);
app.use("/api/rfqitem", rfqItemDetailRoute);
app.use("/api/po", poRoute);
app.use("/api/branch", branchRoute);
app.use("/api/dept", deptRoute);
app.use("/api/purchaselocation", purchaseLocRoute);
app.use("/api/menu", menuRoute);
// app.use("/api/category", categoryRoute);
app.use("/api/uom", uomRoute);
app.use("/api/shipMode", shipModeRouter);
app.use("/api/delivery/timeline", deliveryTimelineRouter);
app.use("/api/buying", buyHouseRouter);
app.use("/api/quotation", quotationRouter);
app.use("/api/quoteitems", quotationItemsRouter);
app.use("/api/itemcategory", itemCategoryRouter);
// app.use("/api/category", itemCategoryRouter);
app.use("/api/vertical", verticalRouter);
app.use("/api/company", companyRouter);
app.use("/api/division", divisionRoute);
app.use("/api/delivery/terms", deliveryTermsRouter);
app.use("/api/quotation/additionalcost", additionalCostRouter);
app.use("/api/leadtime", leadTimeRouter);
app.use("/api/mail", mailRoutes);
app.use("/api/pfi", pfiRoutes);
app.use("/api/vendor-types", vendorTypeMasterRoutes);
app.use("/api/series", SeriesRoutes);
app.use("/api/status", StatusRoutes);
app.use("/api/package", packageRoutes);

// Service po
app.use("/api/service/po/quotation", ServicePOQuotationRoutes);
app.use("/api/service/po/service_list", service_list);
app.use("/api/service/po", servicePO);
app.use("/api/service/po/",RateCardRoutes)

// forex routes

app.use("/api/forex", forexAmount);


//remittance
app.use("/api/remittance/bank", remittance)

//PFI
app.use("/api/commercial/invoice", CommercialInvoiceRoutes);
app.use("/api/insurance", InsuranceRoutes);
app.use("/api/formm", FormMRoutes);
app.use("/api/lc", LetterOfCreditTermsRoutes);
app.use("/api/pfi/son", SonPfiRoutes);
app.use("/api/pfi/nafdac", NafdacPfiRoutes);
app.use("/api/pfi/paar", PaarRoutes);
//Get Data CI against PFI, FormM,
app.use("/api/ci/all", CommercialInvoiceAllData);


app.use("/api/currency/conversion", CurrencyConversionRoutes);

//Operations
app.use("/api/notes", GdnGrnNotes)
app.use("/api/operation/assessment", AssessmentRoutes);
app.use("/api/operation/nafdac", OperationsNafdacMasterRoutes);
app.use("/api/operation/son", OperationsSonRoutes);
app.use("/api/operation/transport/operation/lapse", TransportOperationLapseRoutes);
app.use("/api/operation/container/allocation", ContainerAllocationRoutes);
app.use("/api/operation/govt/charges", GovtChargesRoutes);
app.use("/api/operation/shipping/lapse", ShippingLapseRoutes);
app.use("/api/service/container", AddServiceContainer);

// try pdf Parser
app.post('/api/pdfparse', uploadpdf.single('file'), tryPdfParse);

//shipping
app.use("/api/shipping", ShippingMasterRoutes);
app.use("/api/container", ContainerRoutes);
app.use("/api/vessel", VesselRoutes);
app.use("/api/shipping/instructions", ShippingInstructionsRoutes);
app.use("/api/shipping/advise", ShippingAdviseRoutes);

//Masters
app.use("/api/operation/container/type", ContainerTypesMasters);
app.use("/api/shipping/advise/container/type", ShippingAdviseContainerTypesMasters);
app.use("/api/operation/container/payment/term", PaymentTermContainer);
app.use("/api/transport/operation/lapse", TransportOperationLapse);
app.use("/api/transport/payment/type", TransportPaymentTypeLapse);
app.use("/api/charges/add/expense", AddExpenseChargesRoutes);
app.use("/api/charges/payment/type", PaymentTypeChargesRoutes);
app.use("/api/shipping/lapse", ShippingLapsesRoutes);
app.use("/api/port/destination", PortDestinationRoutes);
app.use("/api/country", CountryRoutes);
app.use("/api/state", StateRoutes);
app.use("/api/city", CityRoutes);
app.use("/api/shipment/type", ShipmentTypeRoutes);
app.use("/api/initiation/point", InitiationPointMasterRoutes);


//payments
app.use("/api/paymentterms", paymentTermsRouter);
app.use("/api/penaltyterms", penaltyTermsRoutes);
app.use("/api/payment-types", paymentTypeMasterRoutes);
app.use("/api/paymentrequests", paymentRequestMasterRoutes);
app.use("/api/payment-transactions", paymentRequestTransactionsMasterRoutes);
app.use("/api/payment", payment);
// app.use('/api/payment',)
app.use("/api/approval", ApprovalRoutes)

//OPO
app.use("/api/opo", OpoRoutes);

//Grn
app.use("/api/create/grn", grnLPr)


//addresss new
app.use("/api/address", addressRoutes);
app.use("/api/bh", buyingHouseRoutes);
app.use("/api/bhouse", buyingHouseRoutes2);

//services
app.use("/api/service", serviceRoutes);


// Error handling middleware
app.use(handleError);

const createMultipleUDFs = require("./models/UserDefinedFunction/UserDefinedFunctions.js");
const CurrencyConversion = require("./models/CurrencyConversion.js");
createMultipleUDFs();



app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

