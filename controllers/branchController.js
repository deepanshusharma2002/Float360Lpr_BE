const db = require('../models');
const { branch: Branch } = db;
const { Op } = require('sequelize');


// Controller method to Create Branch
const createBranch = async (req, res) => {
    try {
        const { branch_name, status } = req.body;
        const newItem = await Branch.create({ branch_name, status });
        res.status(201).json(newItem);
    } catch (err) {
        next(err);
    }
};


// Controller method to Get all Branch
const getAllBranch = async (req, res, next) => {
    const branch_id = req.query.branch_id;
    try {
        if (branch_id) {
            const result = await Branch.findAll({
                where: {
                    branch_id: branch_id,
                    status: { [Op.ne]: 0 }
                },
                order: [['branch_id', 'DESC']]
            });
            res.status(200).json(result);
        } else {
            const result = await Branch.findAll({
                where: {
                    status: { [Op.ne]: 0 }
                },
                order: [['branch_id', 'DESC']]
            });
            res.status(200).json(result);
        }

    } catch (err) {
        next(err)
    }
};


// Controller method to update Branch  by id
const updateBranch = async (req, res, next) => {
    const branch_id = req.query.branch_id;
    try {
        const {
            branch_name,
            status
        } = req.body;
        const result = await Branch.update({
            branch_name, status
        }, {
            where: {
                branch_id: branch_id
            }
        });
        res.status(201).json({ message: "Updated Successfully" });
    } catch (err) {
        next(err)
    }
};


// Controller method to delete item by id
const deleteBranchById = async (req, res, next) => {
    const branch_id = req.query.branch_id;
    try {
        const result = await Branch.update({ status: 0 }, {
            where: {
                branch_id: branch_id
            }
        });
        res.status(201).json({ message: 'Deleted successfully' });
    } catch (err) {
        next(err)
    }
};



module.exports = {
    getAllBranch,
    deleteBranchById,
    createBranch, updateBranch
};





