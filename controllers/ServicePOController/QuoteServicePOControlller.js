const {
  service_po_quote_master,
  freight_quote_service_po,
  document,
} = require("../../models");
const sq = require("sequelize");

const getServicePOQuotations = async (req, res) => {
  try {
    const { po_id } = req.query;

    if (po_id) {
      const quotations = await service_po_quote_master.findAll({
        where: {
          po_id: po_id,
          status: 1,
        },
        include: [{ model: freight_quote_service_po }],
      });

      res.status(200).json({
        success: true,
        data: quotations,
      });
    } else {
      const quotations = await service_po_quote_master.findAll({
        where: {
          status: 1,
        },
        include: [{ model: freight_quote_service_po }],
      });

      res.status(200).json({
        success: true,
        data: quotations,
      });
    }
  } catch (error) {
    console.error("Error in getServicePOQuotations:", error);
    res.status(500).json({
      success: false,
      message: "Error retrieving quotations",
      error: error.message,
    });
  }
};

const createServicePOQuotation = async (req, res) => {
  try {
    console.log("req.body");
    console.log("req.body", req.files);
    const {
      po_id,
      party_name,
      party_add,
      party_email,
      party_contact,
      quote_date,
      payment_term,
      rate_validity_from,
      rate_validity_to,
      qoute_remarks,
      vendor_quote_ref_no,
      ContainerArr,
      fileArray,
      quoteType,
      po_remarks,
    } = req.body;

    console.dir(req.body, { depth: null });

    const newQuotation = await service_po_quote_master.create({
      po_id,
      party_name,
      party_add,
      party_email,
      party_contact,
      quote_date,
      payment_term,
      rate_validity_from,
      rate_validity_to,
      vendor_quote_ref_no,
      qoute_remarks: qoute_remarks,
      po_remarks: po_remarks,
      status: 1,
      quote_type: quoteType,
    });
    const lasteInsdertedId = newQuotation.service_po_quote_master_id;

    if (fileArray && fileArray.length > 0) {
      await Promise.all(
        fileArray.map(async (item, index) => {
          const base64 = req?.files[index]?.buffer?.toString("base64");
          await document.create({
            linked_id: lasteInsdertedId,
            table_name: "service_po_quote_master",
            type: "SERVICE PO QUOTATION",
            doc_name: `${item.doc_name}-${req?.files[index]?.originalname}`,
            doc_base64: base64,
            title: item.remarks,
            status: 1,
          });
        })
      );
    }

    if (ContainerArr && ContainerArr.length > 0) {
      await Promise.all(
        ContainerArr.map(async (item) => {
          await freight_quote_service_po.create({
            service_po_quote_master_id: lasteInsdertedId,
            cbm_container: item.container_type,
            shipping_line: item.shipping_line,
            currency: item.currency,
            rate: item.rate,
            other_charges: item.other_charge,
            ets: item.ets,
            eta: item.eta,
            free_days_pol: item.free_days_at_pol,
            free_days_pod: item.free_days_at_pod,
            port_of_loading: item.port_of_loading,
            port_of_delivery: item.port_of_delivery,

            type: quoteType,
            status: 1,
          });
        })
      );
    }

    res.status(201).json({ message: "Quotation Generated Successfully" });
  } catch (err) {
    console.error("Error in createServicePOQuotation:", err); // Enhanced error logging
    res.status(500).json({ message: "Quotation couldn't be generated" });
  }
};

const generateServicePO = async (req, res) => {
  try {
    const { service_quo_id, procurement_justification } = req.body;
    console.log("body", req.body);
    const newQuotation = await service_po_quote_master.update(
      {
        status: 5,
        po_remarks: procurement_justification,
      },
      { where: { service_po_quote_master_id: service_quo_id } }
    );
    res.status(201).json({ message: "PO Generated Successfully" });
  } catch (err) {
    console.error("Error in generateServicePO:", err); // Enhanced error logging
    res.status(500).json({ message: "Quotation couldn't be generated" });
  }
};

const servicePOQuotationController = {
  createServicePOQuotation,
  generateServicePO,
  getServicePOQuotations,
};
module.exports = servicePOQuotationController;
