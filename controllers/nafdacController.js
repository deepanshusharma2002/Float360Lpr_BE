const db = require('../models')

const { Nafdac } = db

// Function to create a new Nafdac record
const createNafdac = async (req, res, next) => {
    try {
        const nafdacMaster = await Nafdac.create(req.body);
        res.status(201).json(nafdacMaster);
    } catch (error) {
        next(error);
    }
};

// Function to get all Nafdac records
const getAllNafdacs = async (req, res, next) => {
    try {
        const nafdacMasters = await Nafdac.findAll({ attributes: ['nafdac_name'] });
        res.status(200).json(nafdacMasters);
    } catch (error) {
        next(error);
    }
};

// Function to get a single Nafdac record by ID
const getNafdacById = async (req, res, next) => {
    const id = req.params.id;
    try {
        const nafdacMaster = await Nafdac.findByPk(id);
        if (!nafdacMaster) {
            return res.status(404).json({ error: 'Nafdac not found' });
        }
        res.status(200).json(nafdacMaster);
    } catch (error) {
        next(error);
    }
};

// Function to update a Nafdac record by ID
const updateNafdac = async (req, res, next) => {
    const id = req.params.id;
    try {
        const [updated] = await Nafdac.update(req.body, {
            where: { nafdac_id: id }
        });
        if (updated) {
            const updatedNafdac = await Nafdac.findByPk(id);
            res.status(200).json(updatedNafdac);
        } else {
            res.status(404).json({ error: 'Nafdac not found' });
        }
    } catch (error) {
        next(error);
    }
};

// Function to delete a Nafdac record by ID
const deleteNafdac = async (req, res, next) => {
    const id = req.params.id;
    try {
        const deleted = await Nafdac.destroy({
            where: { nafdac_id: id }
        });
        if (deleted) {
            res.status(204).json({ message: 'Nafdac deleted' });
        } else {
            res.status(404).json({ error: 'Nafdac not found' });
        }
    } catch (error) {
        next(error);
    }
};

module.exports = {
    createNafdac,
    getAllNafdacs,
    getNafdacById,
    updateNafdac,
    deleteNafdac,
};
