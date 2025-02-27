// const { vertical_opr } = ('../models');
const db = require('../models');
const { Vertical: vertical_opr } = db;
const formattedDateTime = require("../middleware/time");
const { Op } = require('sequelize');


// Controller method to fetch all items
const getVertical = async (req, res, next) => {
    const vertical_id = req.query.vertical_id;
    try {
        if (!vertical_id) {
            const result = await vertical_opr.findAll({
                where: {
                    status: { [Op.ne]: 0 }
                }
            });
            res.status(200).json(result);
        } else {
            const result = await vertical_opr.findAll({
                where: {
                    vertical_id: vertical_id,
                    status: { [Op.ne]: 0 }
                }
            });
            res.status(200).json(result);
        }

    } catch (err) {
        next(err)
    }
};


// Controller method to fetch all items
const verticalDropDown = async (req, res, next) => {
    try {
        const result = await vertical_opr.findAll({
            where: {
                status: { [Op.ne]: 0 }
            },
            attributes:['vertical_id','vertical_name']
        });
        res.status(200).json(result);

    } catch (err) {
        next(err)
    }
};


// Controller method to delete by id
const deleteVerticalById = async (req, res, next) => {
    const vertical_id = req.query.vertical_id;
    try {
        const result = await vertical_opr.update({ status: 0 }, {
            where: {
                vertical_id: vertical_id
            }
        });
        res.status(200).json({ message: 'Deleted successfully' });
    } catch (err) {
        next(err)
    }
};


// Controller method to Create
const createVertical = async (req, res, next) => {
    try {
        const {
            vertical_name,
            created_by
        } = req.body;
        const result = await vertical_opr.create({
            vertical_name,
            status: 1,
            created_by,
            created_on: formattedDateTime
        });
        res.status(201).json({ message: "Submit Successfully" });
    } catch (err) {
        next(err)
    }
};



const updateVerticalById = async (req, res, next) => {
    const vertical_id = req.query.vertical_id;
    try {
        const {
            vertical_name,
            updated_by
        } = req.body;
        const result = await vertical_opr.update({
            vertical_name,
            updated_by,
            updated_on: formattedDateTime
        }, {
            where: {
                vertical_id: vertical_id
            }
        });
        res.status(201).json({ message: "Updated Successfully" });
    } catch (err) {
        next(err)
    }
};

verticalController = { getVertical, deleteVerticalById, createVertical, updateVerticalById, verticalDropDown };
module.exports = verticalController;

