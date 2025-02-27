// const { quotation_items } = ('../models');
const db = require('../models');
const { quotation_items } = db;
const formattedDateTime = require("../middleware/time");
const { Op, where } = require('sequelize');

// Controller method to fetch all items
const getQuotationItem = async (req, res, next) => {
    const quo_item_id = req.query.quo_item_id;
    const quo_id = req.query.quo_id;

    let result;
    try {
        if (quo_item_id) {
            result = await quotation_items.findAll({
                where: {
                    quo_item_id: quo_item_id,
                    status: { [Op.ne]: 0 }
                },
                include: [
                    { model: db.ItemsMaster, attributes: ['item_name'] }
                ],

            });

        } else if (quo_id) {
            result = await quotation_items.findAll({
                where: {
                    quo_id: quo_id,
                    status: { [Op.ne]: 0 }
                },
                include: [
                    { model: db.ItemsMaster, attributes: ['item_name'] }
                ],
            });

        } else {
            result = await quotation_items.findAll({
                where: {
                    status: { [Op.ne]: 0 }
                },
                include: [
                    { model: db.ItemsMaster, attributes: ['item_name'] }
                ],
            });

        }

        let newresult = await result.forEach(item => (
            item.dataValues.uom = 'Kg',
            item.dataValues.item_name = 'ABCD Name'
            // item.dataValues.vendor_name = 'Depanshu Don',
            // item.dataValues.vendor_address = 'Noida sec 64',
            // item.dataValues.vendor_email = 'vendor@gmail.com',
            // item.dataValues.vendor_mob = '+1234'
        ))

        return res.status(200).json(result);

    } catch (err) {
        next(err)
    }
};


// Controller method to delete by id
const deleteQuotationItemById = async (req, res, next) => {
    const quo_item_id = req.query.quo_item_id;
    try {
        const result = await quotation_items.update({ status: 0 }, {
            where: {
                quo_item_id: quo_item_id
            }
        });
        res.status(200).json({ message: 'Deleted successfully' });
    } catch (err) {
        next(err)
    }
};

// Controller method to Create
const createQuotationItem = async (req, res, next) => {
    try {
        const {
            quo_id,
            item_specification,
            item_type,
            item_description,
            opr_qty,
            opo_qtd,
            quote_qty:quote_qtd,
            rate,
            remarks,
            created_by
        } = req.body;

        console.log("create qote item");

        console.log(req.body);


        const result = await quotation_items.create({
            quo_id,
            item_type,
            item_specification,
            item_description,
            opr_qty,
            opo_qtd,
            quote_qtd,
            rate,
            remarks,
            status: 1,
            created_by,
            created_on: formattedDateTime
        });
        res.status(201).json({ message: "Submit Successfully" });
    } catch (err) {
        next(err)
    }
};

const updateQuotationItemById = async (req, res, next) => {
    const quo_item_id = req.query.quo_item_id;
    try {
        const {
            quo_id,
            item_specification,
            item_type,
            item_description,
            opr_qty,
            opo_qtd,
            quote_qtd,
            rate,
            remarks,
            updated_by
        } = req.body;
        const result = await quotation_items.update({
            quo_id,
            item_specification,
            item_type,
            item_description,
            opr_qty,
            opo_qtd,
            quote_qtd,
            rate,
            remarks,
            updated_by,
            updated_on: formattedDateTime
        }, {
            where: {
                quo_item_id: quo_item_id
            }
        });
        res.status(201).json({ message: "Updated Successfully" });
    } catch (err) {
        next(err)
    }
};

const getQuotationItemByQuoId = async (quo_id) => {
    let res = await quotation_items.findAll({
        where: { quo_id: quo_id }
    })
    return res;
}

quotationItemsController =
{
    getQuotationItem,
    deleteQuotationItemById,
    createQuotationItem,
    updateQuotationItemById,
    getQuotationItemByQuoId
};

module.exports = quotationItemsController 
