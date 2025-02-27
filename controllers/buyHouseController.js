// const { buy_house_opr } = ('../models');
const db = require('../models');
const { BuyingHouse: buy_house_opr } = db;
const formattedDateTime = require("../middleware/time");
const { Op } = require('sequelize');

// Controller method to fetch all items
const getBuyHouse = async (req, res, next) => {
    const buying_house_id = req.query.buying_house_id;
    try {
        if (buying_house_id) {
            const result = await buy_house_opr.findAll({
                where: {
                    buying_house_id: buying_house_id,
                    status: { [Op.ne]: 0 }
                }
            });
            res.status(200).json(result);
        } else {
            const result = await buy_house_opr.findAll({
                where: {
                    status: { [Op.ne]: 0 }
                }
            });
            res.status(200).json(result);
        }

    } catch (err) {
        next(err)
    }
};

// Controller method to delete by id
const deleteBuyHouseById = async (req, res, next) => {
    const buying_house_id = req.query.buying_house_id;
    try {
        const result = await buy_house_opr.update({ status: 0 }, {
            where: {
                buying_house_id: buying_house_id
            }
        });
        res.status(200).json({ message: 'Deleted successfully' });
    } catch (err) {
        next(err)
    }
};


// Controller method to Create
const createBuyHouse = async (req, res, next) => {
    try {
        const {
            buy_house_name, 
        } = req.body;
        const result = await buy_house_opr.create({
            buy_house_name,
            status: 1,
            created_on: formattedDateTime
        });
        res.status(201).json({ message: "Submit Successfully" });
    } catch (err) {
        next(err)
    }
};

const updateBuyHouseById = async (req, res, next) => {
    const buying_house_id = req.query.buying_house_id;
    try {
        const {
            buy_house_name,
            updated_by
        } = req.body;
        const result = await buy_house_opr.update({
            buy_house_name,
            updated_by,
            updated_on: formattedDateTime
        }, {
            where: {
                buying_house_id: buying_house_id
            }
        });
        res.status(201).json({ message: "Updated Successfully" });
    } catch (err) {
        next(err)
    }
};

buyHouseController = { getBuyHouse, deleteBuyHouseById, createBuyHouse, updateBuyHouseById };
module.exports = buyHouseController;




