/**
* Description: penalty terms show in rfq
* Developer: Rakesh
* Created Date: 17-07-2024
* Updated By:
* Last Updated:17-07-2024
*/


const db = require('../models');
const { PenaltyTermsMaster } = db;
const { Op } = require('sequelize');

// Create a new penalty term
const createPenaltyTerm = async (req, res, next) => {
    try {
        const {
            penalty_terms_name, status
        } = req.body;
        const result = await PenaltyTermsMaster.create({
            penalty_terms_name,
            status
        });
        return res.status(201).json({ message: "Submit Successfully" });
    } catch (err) {
        next(err)
    }
};

// Get all penalty terms
const getAllPenaltyTerms = async (req, res, next) => {
    try {
            const result = await PenaltyTermsMaster.findAll({
                where: {
                    status: { [Op.eq]: 1 }
                },
                order: [['penalty_terms_name', 'ASC']],
                attributes: [ 'penalty_terms_id', 'penalty_terms_name'],
            });
           return res.status(200).json(result);
    } catch (err) {
        next(err);
    }
};

// Get a single penalty term by ID
const getPenaltyTermById = async (req, res, next) => {
    const penalty_terms_id = req.query.penalty_terms_id;
    try {
        if (!penalty_terms_id) {
            const result = await PenaltyTermsMaster.findAll({
                where: {
                    status: { [Op.ne]: 0 }
                },
                order: [['penalty_terms_id', 'DESC']]
            });
           return res.status(200).json(result);
        } else {
            const result = await PenaltyTermsMaster.findByPk((penalty_terms_id),{
                where: {
                    status: { [Op.ne]: 0 }
                }
            });
            return res.status(200).json(result);
        }

    } catch (err) {
        next(err)
    }
};

// Update a penalty term by ID
const updatePenaltyTerm = async (req, res, next) => {
    const penalty_terms_id = req.query.penalty_terms_id;

    try {
        // Find the shipment mode by primary key
        const PenaltyTerms = await PenaltyTermsMaster.findByPk(penalty_terms_id);


        // Update the shipment mode
        const { penalty_terms_name, status } = req.body;
        await PenaltyTerms.update({
            penalty_terms_name,
            status
        });

        res.status(200).json({ message: "Updated Successfully" });
    } catch (err) {
        next(err);
    }
};

// Delete a penalty term by ID
const deletePenaltyTerm = async (req, res, next) => {
    const penalty_terms_id = req.query.penalty_terms_id;
    try {
        const result = await PenaltyTermsMaster.update({ status: 0 }, {
            where: {
                penalty_terms_id: penalty_terms_id
            }
        });
        return res.status(200).json({ message: 'Deleted successfully' });
    } catch (err) {
        next(err)
    }
};

module.exports = {
    createPenaltyTerm,
    getAllPenaltyTerms,
    getPenaltyTermById,
    updatePenaltyTerm,
    deletePenaltyTerm
};
