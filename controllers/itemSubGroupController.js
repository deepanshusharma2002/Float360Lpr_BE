const { Op } = require('sequelize');
const { ItemSubGroupMaster } = require('../models')

// Create a new item sub group
exports.createItemSubGroup = async (req, res, next) => {
    try {
        const { item_sub_group_name, item_parent_group_id, status } = req.body
        const itemSubGroup = await ItemSubGroupMaster.create(req.body);
        res.status(201).json(itemSubGroup);
    } catch (error) {
        next(error)
    }
};


// // Create a new item sub group
// exports.createItemSubGroup = async (req, res) => {
//     try {
//         const itemSubGroup = await ItemSubGroupMaster.create(req.body);
//         res.status(201).json(itemSubGroup);
//     } catch (error) {
//         res.status(400).json({ error: error.message });
//     }
// };

// Get all item sub groups

exports.getAllItemSubGroups = async (req, res) => {
    let { category_id } = req.query;
    try {
        if (category_id) {
            const itemSubGroups = await ItemSubGroupMaster.findAll({
                where: {
                    status: { [Op.ne]: 0 },
                    item_parent_group_id: category_id
                }
            });
            res.status(200).json(itemSubGroups);

        } else {
            const itemSubGroups = await ItemSubGroupMaster.findAll({
                where: { status: { [Op.ne]: 0 } }
            });
            res.status(200).json(itemSubGroups);

        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Get an item sub group list by parnt Group id
exports.getAllItemGroupsByGropuid = async (req, res) => {
    let groupId = req.query.groupid
    try {
        const itemGroups = await ItemSubGroupMaster.findAll({
            where: {
                item_parent_group_id: groupId
            },
            attributes: ['item_sub_group_id', 'item_sub_group_name']
        });
        res.status(200).json(itemGroups);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Get an item sub group by ID
exports.getItemSubGroupById = async (req, res) => {
    try {
        const itemSubGroup = await ItemSubGroupMaster.findByPk(req.params.id);
        if (itemSubGroup) {
            res.status(200).json(itemSubGroup);
        } else {
            res.status(404).json({ message: 'Item sub group not found' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Update an item sub group by ID
exports.updateItemSubGroup = async (req, res) => {
    try {
        const itemSubGroup = await ItemSubGroupMaster.findByPk(req.query.item_sub_group_id);
        if (itemSubGroup) {
            await itemSubGroup.update(req.body);
            res.status(200).json(itemSubGroup);
        } else {
            res.status(404).json({ message: 'Item sub group not found' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Soft delete an ItemSubGroup by ID
exports.deleteItemSubGroup = async (req, res) => {
    const itemSubGroupId = req.query.item_sub_group_id;
    try {
        // Find the item sub group by primary key
        const itemSubGroup = await ItemSubGroupMaster.findByPk(itemSubGroupId);

        if (itemSubGroup) {
            // Perform a soft delete by updating the status to 0 (or your chosen deleted indicator)
            await itemSubGroup.update({ status: 0 });

            res.status(200).json({ message: 'Item sub group deleted successfully' });
        } else {
            res.status(404).json({ message: 'Item sub group not found' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
