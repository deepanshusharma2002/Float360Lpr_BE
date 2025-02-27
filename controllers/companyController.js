// const { company_master } = ('../models');
const db = require('../models');
const { CompanyMaster: company_master } = db;
const formattedDateTime = require("../middleware/time");
const { Op } = require('sequelize');


// Get all company
const getCompany = async (req, res, next) => {
    const company_id = req.query.company_id;
    try {
        if (!company_id) {
            const result = await company_master.findAll({
                attributes: ["company_id", "company_name"],
                where: {
                    status: { [Op.ne]: 0 }
                }
            });
            res.status(200).json(result);
        } else {
            const result = await company_master.findAll({
                attributes: ["company_id", "company_name"],
                where: {
                    company_id: company_id,
                    status: { [Op.ne]: 0 }
                }
            });
            res.status(200).json(result);
        }

    } catch (err) {
        next(err)
    }
};

// Get company according to vertical
const getCompanyByVertical = async (req, res, next) => {
    const vertical_id = req.query.vertical_id;
    try {
        const result = await company_master.findAll({
            where: {
                vertical_id: vertical_id,
                status: { [Op.ne]: 0 }
            }
        });
        res.status(200).json(result);
    } catch (err) {
        next(err)
    }
};

// Controller method to delete by id
const deleteCompanyById = async (req, res, next) => {
    const company_id = req.query.company_id;
    try {
        const result = await company_master.update({ status: 0 }, {
            where: {
                company_id: company_id
            }
        });
        res.status(200).json({ message: 'Deleted successfully' });
    } catch (err) {
        next(err)
    }
};

// Controller method to Create
const createCompany = async (req, res, next) => {
    try {
        const {
            company_code,
            company_name,
            vertical_id,
        } = req.body;
        const result = await company_master.create({
            company_code,
            company_name,
            vertical_id,
            status: 1,
            created_on: formattedDateTime
        });
        res.status(201).json({ message: "Submit Successfully" });
    } catch (err) {
        next(err)
    }
};

const updateCompanyById = async (req, res, next) => {
    const company_id = req.query.company_id;
    try {
        const {
            company_code,
            company_name,
            vertical_id,
            updated_by
        } = req.body;
        const result = await company_master.update({
            company_code,
            company_name,
            vertical_id,
            updated_by,
            updated_on: formattedDateTime
        }, {
            where: {
                company_id: company_id
            }
        });
        res.status(201).json({ message: "Updated Successfully" });
    } catch (err) {
        next(err)
    }
};

// GET BUYING HOUSE
const getBuyingHouse = async (req, res, next) => {
    const company_id = req.query.company_id;
    try {
        if (!company_id) {
            const result = await company_master.findAll({
                attributes: ['company_name', 'company_id'],
                where: {
                    status: { [Op.ne]: 0 },
                    company_type: {
                        [Op.eq]: 'Buying House'
                    }
                }
            });
            res.status(200).json(result);
        } else {
            const result = await company_master.findAll({
                attributesL: ["company_id", "company_name"],
                where: {
                    company_id: company_id,
                    status: { [Op.ne]: 0 }
                }
            });
            res.status(200).json(result);
        }

    } catch (err) {
        next(err)
    }
};

companyController = { getCompany, deleteCompanyById, createCompany, updateCompanyById, getCompanyByVertical, getBuyingHouse };
module.exports = companyController;

