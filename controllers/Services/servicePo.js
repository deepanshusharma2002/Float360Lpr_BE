const { Op } = require("sequelize");
const db = require("../../models");
const { ServiceQUO, ServiceRFQ } = db;



// get service po_list will service quote widh staus is 3
exports.getServicePoForVendorAcceptance = async (req, res, next) => {
    try {
        let servicePolist = await ServiceQUO.findAll({
            where: {
                status: {
                    [Op.gte]: 3
                }
            }
        })
        res.status(201).json(servicePolist)
    }
    catch (err) {
        next(err)
    }
}


// get service po_list will service quote widh staus is 3

exports.confirmpoAcceptance = async (req, res, next) => {
    try {
        const { service_po_id: po_id, remarks: po_acceptance_remarks } = req.body;
        let servicePolist = await ServiceQUO.update({ status: 4, po_acceptance_remarks },
            {
                where: {
                    status: 3
                    , po_id
                }
            })
        res.status(201).json(servicePolist)
    }
    catch (err) {
        next(err)
    }
}