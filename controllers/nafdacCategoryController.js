const db = require('../models')
const { NafdacCategoryMaster } = db;



// Create a new record
const createNafdacCategoryMaster = async (req, res) => {
    try {
        const newRecord = await NafdacCategoryMaster.create(req.body);
        res.status(201).json(newRecord);
    } catch (error) {
        res.status(500).json({ message: 'Error creating record', error: error.message });
    }
}

// Read all records
const getAllNafdacCategoryMasters = async (req, res) => {
    try {
        const records = await NafdacCategoryMaster.findAll({ attributes: ['nafdac_category_name'] });
        res.status(200).json(records);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching records', error: error.message });
    }
}

// Read a single record by ID
const getNafdacCategoryMasterById = async (req, res) => {
    try {
        const record = await NafdacCategoryMaster.findByPk(req.params.id);
        if (record) {
            res.status(200).json(record);
        } else {
            res.status(404).json({ message: 'Record not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error fetching record', error: error.message });
    }
}

// Update a record by ID
const updateNafdacCategoryMaster = async (req, res) => {
    try {
        const [updated] = await NafdacCategoryMaster.update(req.body, {
            where: { nafdac_category_id: req.params.id }
        });
        if (updated) {
            const updatedRecord = await NafdacCategoryMaster.findByPk(req.params.id);
            res.status(200).json(updatedRecord);
        } else {
            res.status(404).json({ message: 'Record not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error updating record', error: error.message });
    }
}

// Delete a record by ID
const deleteNafdacCategoryMaster = async (req, res) => {
    try {
        const deleted = await NafdacCategoryMaster.destroy({
            where: { nafdac_category_id: req.params.id }
        });
        if (deleted) {
            res.status(204).json({ message: 'Record deleted' });
        } else {
            res.status(404).json({ message: 'Record not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error deleting record', error: error.message });
    }
}

module.exports = {
    createNafdacCategoryMaster,
    getAllNafdacCategoryMasters,
    getNafdacCategoryMasterById,
    updateNafdacCategoryMaster,
    deleteNafdacCategoryMaster
};
