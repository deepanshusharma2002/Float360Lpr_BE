const { Op } = require('sequelize');
const { ItemSuperGroupMaster } = require('../models'); // Adjust the path as necessary

// Create a new item super group
exports.createItemSuperGroup = async (req, res) => {
    try {
        let { item_super_group_name, item_super_group_description } = req.body

        const itemSuperGroup = await ItemSuperGroupMaster.create(req.body);

        res.status(201).json({ msg: 'Super group created successfully', data: itemSuperGroup });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};


// Get all item super groups
exports.getAllItemSuperGroups = async (req, res) => {
    try {
        const itemSuperGroups = await ItemSuperGroupMaster.findAll({
            where: { status: { [Op.ne]: 0 } }
        });
        res.status(200).json(itemSuperGroups);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};


// Get item super groups for dropdown
exports.itemSuperGroupDrpDn = async (req, res, next) => {
    try {
        const itemSuperGroups = await ItemSuperGroupMaster.findAll({
            attributes: ['item_super_group_id', 'item_super_group_name'],
            where: { status: { [Op.ne]: 0 } }
        });
        res.status(200).json(itemSuperGroups);
    } catch (error) {
        next(error);
    }
};


// Get an item super group by ID
exports.getItemSuperGroupById = async (req, res) => {
    try {
        const itemSuperGroup = await ItemSuperGroupMaster.findByPk(req.params.id);
        if (itemSuperGroup) {
            res.status(200).json(itemSuperGroup);
        } else {
            res.status(404).json({ message: 'Item super group not found' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};


// Update an item super group by ID
exports.updateItemSuperGroup = async (req, res) => {
    try {
        const itemSuperGroup = await ItemSuperGroupMaster.findByPk(req.query.item_super_group_id);
        if (itemSuperGroup) {
            await itemSuperGroup.update(req.body);
            res.status(200).json(itemSuperGroup);
        } else {
            res.status(404).json({ message: 'Item super group not found' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};


// Soft delete an item super group by ID
exports.deleteItemSuperGroup = async (req, res) => {
    const itemSuperGroupId = req.query.item_super_group_id;
    try {
        const itemSuperGroup = await ItemSuperGroupMaster.findByPk(itemSuperGroupId);

        if (itemSuperGroup) {
            // Perform a soft delete by updating the status to 0 (or your chosen deleted indicator)
            await itemSuperGroup.update({ status: 0 });

            res.status(200).json({ message: 'Item super group deleted successfully' });
        } else {
            res.status(404).json({ message: 'Item super group not found' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
