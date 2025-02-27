const db = require("../../models");
const { ServiceQUO, ServiceRFQ } = db;
const { Op } = require('sequelize');



//generate service rfq
exports.createServiceQuotation = async (req, res, next) => {
    try {
        req.body.status = 1
        const { vendor_id, amount, po_id, remarks, service_rfq_id, status, created_by } = req.body
        let newServiceQuo = await ServiceQUO.create({ vendor_id, amount, po_id, remarks, status, service_rfq_id, created_by })
        if (newServiceQuo) {
            res.status(201).json({ message: "Quotation Generated Sucessfully" })
        }
    } catch (errr) {
        next(errr)
    }
}

//all quotaion list
exports.ServiceQuotationList = async (req, res, next) => {
    try {
        let serviceQuotation = await ServiceQUO.findAll()
        if (serviceQuotation) {
            res.status(201).json(serviceQuotation)
        }
    } catch (errr) {
        next(errr)
    }
}

//service quotation by rfq id
exports.ServiceQuotationListByServiceRFQid = async (req, res, next) => {
    try {
        let { service_rfq_id } = req.query;
        let serviceQuotation = await ServiceQUO.findAll({
            where: { service_rfq_id, status: 1 }
        })
        if (serviceQuotation) {
            res.status(201).json(serviceQuotation)
        }
    } catch (errr) {
        next(errr)
    }
}

// confirm quotaiton
exports.ServiceQuotationConfirmQuoid = async (req, res, next) => {
    try {
        let { service_quo_id, service_rfq_id } = req.query;
        let serviceQuotation = await ServiceQUO.update(
            { status: 2 },
            {
                where: { service_quo_id }
            })
        let serviceRfq = await ServiceRFQ.update(
            { status: 2 },
            {
                where: { service_rfq_id }
            })
        if (serviceQuotation) {
            console.log(serviceQuotation)
            res.status(201).json({ message: "Quotation Has Been confirm" })
        }
    } catch (errr) {
        next(errr)
    }
}


//service confirmQuotaion list will be service po
exports.getConfirmQuoList = async (req, res, next) => {
    try {

        let serviceQuotation = await ServiceQUO.findAll({
            where: { status: 2 }
        });
        if (serviceQuotation) {
            res.status(201).json(serviceQuotation)
        }
    } catch (errr) {
        next(errr)
    } ``
}
