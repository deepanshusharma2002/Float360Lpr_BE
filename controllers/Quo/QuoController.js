const db = require("../../models");
const { ServiceQUO, ServiceRFQ } = db;
const { Op } = require("sequelize");

//generate service rfq
exports.createServiceQuotation = async (req, res, next) => {
  try {
    console.log("req.body", req.body);
    const {
      po_id,
      service_rfq_id,
      vendor_code,
      valid_from,
      valid_to,
      shipping_line,
      from_port,
      to_port,
      vehicle_schedule_ets,
      vehicle_schedule_ets2,
      vehicle_schedule_ets3,
      vehicle_schedule_eta,
      vehicle_schedule_eta2,
      vehicle_schedule_eta3,
      currency,
      amount,
      quote_date,
      container_type,
      remarks,
      created_by,
    } = req.body;
    let newServiceQuo = await ServiceQUO.create({
      vendor_id: vendor_code,
      po_id,
      service_rfq_id,
      vendor_code,
      valid_from,
      valid_to,
      shipping_line,
      from_port,
      to_port,
      vehicle_schedule_ets,
      vehicle_schedule_ets2,
      vehicle_schedule_ets3,
      vehicle_schedule_eta,
      vehicle_schedule_eta2,
      vehicle_schedule_eta3,
      currency,
      amount,
      quote_date,
      container_type,
      remarks,
      created_by,
      status: 1,
      created_by,
    });
    if (newServiceQuo) {
      res.status(201).json({ message: "Quotation Generated Sucessfully" });
    }
  } catch (errr) {
    next(errr);
  }
};

//all quotaion list
exports.ServiceQuotationList = async (req, res, next) => {
  try {
    let serviceQuotation = await ServiceQUO.findAll();
    if (serviceQuotation) {
      res.status(201).json(serviceQuotation);
    }
  } catch (errr) {
    next(errr);
  }
};

//service quotation by rfq id
exports.ServiceQuotationListByServiceRFQid = async (req, res, next) => {
  try {
    let { service_rfq_id } = req.query;
    let serviceQuotation = await ServiceQUO.findAll({
      where: { service_rfq_id, status: 1 },
    });
    if (serviceQuotation) {
      res.status(201).json(serviceQuotation);
    }
  } catch (errr) {
    next(errr);
  }
};

// confirm quotaiton
exports.ServiceQuotationConfirmQuoid = async (req, res, next) => {
  try {
    let { service_quo_id, service_rfq_id } = req.query;
    let serviceQuotation = await ServiceQUO.update(
      { status: 2 },
      {
        where: { service_quo_id },
      }
    );
    let serviceRfq = await ServiceRFQ.update(
      { status: 2 },
      {
        where: { service_rfq_id },
      }
    );
    if (serviceQuotation) {
      console.log(serviceQuotation);
      res.status(201).json({ message: "Quotation Has Been confirm" });
    }
  } catch (errr) {
    next(errr);
  }
};

//service confirmQuotaion list will be service po
exports.getConfirmQuoList = async (req, res, next) => {
  try {
    let serviceQuotation = await ServiceQUO.findAll({
      where: {
        status: {
          [Op.gte]: 2,
        },
      },
    });
    if (serviceQuotation) {
      res.status(201).json(serviceQuotation);
    }
  } catch (errr) {
    next(errr);
  }
  ``;
};
