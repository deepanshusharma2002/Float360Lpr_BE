const db = require('../models');
const { menu: MenuMaster } = db;



// Controller method to fetch all items
const getAllMenu = async (req, res) => {
    try {
        const items = await MenuMaster.findAll();
        res.status(200).json(items);

    } catch (err) {
        // console.error('Error fetching items:', err);
        // res.status(500).json({ error: 'Error fetching items' });
        next(err);
    }
};


// Controller method to fetch item by id
const getMenuById = async (req, res) => {
    const itemid = req.params.id;
    try {
        const item = await MenuMaster.findByPk(itemid);

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


// Controller method to delte item by id
const deleteMenuById = async (req, res) => {
    const itemid = req.params.id;
    try {
        const item = await MenuMaster.findByPk(itemid);

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


// Controller method to delte item by id
const createMenu = async (req, res) => {
    try {
        const { mtext, mcode } = req.body;
        const newItem = await MenuMaster.create({ mtext, mcode });
        res.status(201).json(newItem);
    } catch (err) {
        // console.error('Error creating item:', err);
        // res.status(500).json({ error: 'Error creating item' });
        next(err);
    }
};




module.exports = {
    getAllMenu,
    getMenuById,
    deleteMenuById,
    createMenu
};





