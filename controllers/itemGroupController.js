const { Op } = require('sequelize')
const { ItemGroupMaster } = require('../models'); // Adjust the path as necessary



// Create a new item group
exports.createItemGroup = async (req, res) => {
    try {
        const itemGroup = await ItemGroupMaster.create(req.body);
        res.status(201).json({ 'msg': 'Group created Succesfully', 'data': itemGroup });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Get all item groupss
exports.getAllItemGroups = async (req, res) => {
    try {
        const itemGroups = await ItemGroupMaster.findAll({
            where: { status: { [Op.ne]: 0 } }
        });
        res.status(200).json(itemGroups);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Get all item groupss
exports.itemGropuDrpDn = async (req, res, next) => {
    try {
        const itemGroups = await ItemGroupMaster.findAll({
            attributes: ['item_group_id', 'item_group_name'],
            where: { status: { [Op.ne]: 0 } }
        });
        res.status(200).json(itemGroups);
    } catch (error) {
        next(error)
    }
};


// Get an item group by ID
exports.getItemGroupById = async (req, res) => {
    try {
        const itemGroup = await ItemGroupMaster.findByPk(req.params.id);
        if (itemGroup) {
            res.status(200).json(itemGroup);
        } else {
            res.status(404).json({ message: 'Item group not found' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};


// Update an item group by ID
exports.updateItemGroup = async (req, res) => {
    try {
        const { item_group_name } = req.body
        const itemGroup = await ItemGroupMaster.findByPk(req.query.item_group_id);
        if (itemGroup) {
            await itemGroup.update(req.body);
            res.status(200).json(itemGroup);
        } else {
            res.status(404).json({ message: 'Item group not found' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};


// Delete an item group by ID
// exports.deleteItemGroup = async (req, res) => {
//     try {
//         const itemGroup = await ItemGroupMaster.findByPk(req.query.item_group_id);
//         if (itemGroup) {
//             await itemGroup.destroy();
//             res.status(204).json();
//         } else {
//             res.status(404).json({ message: 'Item group not found' });
//         }
//     } catch (error) {
//         res.status(400).json({ error: error.message });
//     }
// };


// Soft delete an ItemGroup by ID
exports.deleteItemGroup = async (req, res) => {
    const itemGroupId = req.query.item_group_id;
    try {
        // Find the item group by primary key
        const itemGroup = await ItemGroupMaster.findByPk(itemGroupId);

        if (itemGroup) {
            // Perform a soft delete by updating the status to 0 (or your chosen deleted indicator)
            await itemGroup.update({ status: 0 });

            res.status(200).json({ message: 'Item group deleted successfully' });
        } else {
            res.status(404).json({ message: 'Item group not found' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};


// Get item categories by super category ID
exports.getItemCategoryBySuperCate = async (req, res, next) => {
    const item_super_group_id = req.query.item_super_category_id;
    try {
        // Find the item groups by super category ID
        const itemGroup = await ItemGroupMaster.findAll({
            where: {
                item_super_group_id,
                status: {
                    [Op.ne]: 0  // Op.ne means "not equal to"
                }
            }
        });
        if (itemGroup.length > 0) {
            // Return the found item groups
            res.status(200).json({ message: 'Item groups found', data: itemGroup });
        } else {
            res.status(404).json({ message: 'No item groups found' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};


// Create a new item group
exports.createItemGroup2 = async (req, res) => {
    try {
        let { item_super_group_id, item_group_name, item_group_description, status } = req.body
        const itemGroup = await ItemGroupMaster.create(req.body);
        res.status(201).json({ 'msg': 'Group created Succesfully', 'data': itemGroup });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};