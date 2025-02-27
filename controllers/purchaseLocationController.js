const db = require('../models');
const { poMaster: PLMaster } = db

const getAllPurcLocation = async (req, res) => {
    try {
        const items = await PLMaster.findAll();
        res.status(200).json(items);

    } catch (err) {
        // console.error('Error fetching Branch:', err);
        // res.status(500).json({ error: 'Error fetching items' });
        next(err);
    }
};

const getPurcLocationById = async (req, res) => {
    const itemid = req.params.id;
    try {
        const item = await PLMaster.findByPk(itemid);

        if (!item) {
            return res.status(404).json({ error: 'Item not found' });
        }

        res.status(200).json(item);
    } catch (err) {
        // console.error(`Error fetching item with id ${itemid}:`, err);
        // res.status(500).json({ error: 'Error fetching item' });
        next(err);
    }
};

const deletePurcLocationById = async (req, res) => {
    const itemid = req.params.id;
    try {
        const item = await PLMaster.findByPk(itemid);

        if (!item) {
            return res.status(404).json({ error: 'Item not found' });
        }

        item.destroy()
        res.status(200).json({ message: 'Item deleted successfully' });
    } catch (err) {
        // console.error(`Error fetching item with id ${itemid}:`, err);
        // res.status(500).json({ error: 'Error fetching item' });
        next(err);
    }
};

const createPurcLocation = async (req, res) => {
    try {
        const { purchase_location_name } = req.body;
        const newItem = await PLMaster.create({ purchase_location_name });
        res.status(201).json(newItem);
    } catch (err) {
        // console.error('Error creating item:', err);
        // res.status(500).json({ error: 'Error creating item' });
        next(err);
    }
};

module.exports = {
    getAllPurcLocation,
    getPurcLocationById,
    deletePurcLocationById,
    createPurcLocation
};





